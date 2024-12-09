import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const socket = io('http://localhost:3001');

const Livestreaming = () => {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const userStream = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socket.emit('join', 'room-id');

        socket.on('user-joined', (userId) => {
          const peer = createPeer(userId, socket.id, stream);
          peersRef.current.push({
            peerID: userId,
            peer,
          });
          setPeers((prevPeers) => [...prevPeers, peer]);
        });

        socket.on('signal', (data) => {
          const item = peersRef.current.find((p) => p.peerID === data.from);
          if (item) {
            item.peer.signal(data.signal);
          }
        });

        socket.on('user-left', (userId) => {
          const peerObj = peersRef.current.find((p) => p.peerID === userId);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== userId);
          peersRef.current = peers;
          setPeers(peers);
        });
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getUserMedia();

    return () => {
      // Clean up on component unmount
      stopStreamAndPeers();
      socket.emit('leave-room', 'room-id');
    };
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('signal', {
        to: userToSignal,
        from: callerID,
        signal,
      });
    });

    peer.on('disconnect', () => {
      peer.destroy();
    });

    return peer;
  }

  function stopStreamAndPeers() {
    console.log('Stopping all media tracks and peers...');
    // Stop all media tracks
    if (userStream.current) {
      userStream.current.getTracks().forEach((track) => {
        console.log('Stopping track:', track);
        track.stop();
      });
      userStream.current = null;
    }
    if (userVideo.current) {
      userVideo.current.srcObject = null;
    }

    // Destroy all peers
    peersRef.current.forEach(({ peer }) => peer.destroy());
    peersRef.current = [];
    setPeers([]);
  }

  function endStream() {
    stopStreamAndPeers();
    socket.emit('leave-room', 'room-id');
    navigate('/');
  }
  
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("empId");
    localStorage.setItem("role", "");
    navigate("/");
  };
  return (
    <div className='livestream-container'>
    <Navigation onLogout={handleLogout} />
      <video className='video' ref={userVideo} autoPlay muted style={{ width: '800px', height: '400px' ,marginLeft:'400px', marginRight:'400px'}} />
      {peers.map((peer, index) => (
        <Video key={index} peer={peer} />
      ))}
      <button className='end-stream-button' style={{margin:'20px auto',padding:'8px auto',fontSize:'20px'}} onClick={endStream}>End Live Stream</button>
      <Footer/>
    </div>
  );
};

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });

    return () => {
      peer.destroy();
    };
  }, [peer]);

  return <video ref={ref} autoPlay style={{ width: '600px', height: '400px' }} />;
};

export default Livestreaming;
