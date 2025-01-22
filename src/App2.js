import React, { useEffect, useState } from 'react';
import {
  FaVideo,
  FaPlay,
  FaFilm,
  // FaLinkedin,
  FaInstagram,
  // FaTwitter,
  FaEnvelope,
  FaEye,
  FaUsers,
  FaCloudUploadAlt,
  // FaTimes,
  FaCode,
  FaCamera,
  FaLightbulb,
  FaMagic,
  FaPalette
} from 'react-icons/fa';

// Define types for Video and SocialLink
interface Video {
  id: number;
  title: string;
  url: string;
}

interface SocialLink {
  id: number;
  icon: React.ComponentType<{ size?: number }>; 
  url: string;
  label: string;
}

interface Metric {
  icon: React.ComponentType<{ className?: string }>; 
  value: string;
  label: string;
  color: string;
}

// Component to display a video card with play functionality
const VideoCard: React.FC<{ video: Video; aspectRatio?: string }> = ({ video, aspectRatio = "video" }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  // Effect to fetch video thumbnail
  useEffect(() => {
    if (video.url.includes('vimeo')) {
      // Fetch Vimeo thumbnail
      fetch(`https://vimeo.com/api/oembed.json?url=${video.url}`)
        .then(response => response.json())
        .then(data => setThumbnailUrl(data.thumbnail_url));
    } else {
      // Extract video ID from YouTube URL
      const videoId = video.url.split('v=')[1];
      // Get high quality thumbnail
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    }
  }, [video.url]);

  // Function to get the embed URL for Vimeo or YouTube
  const getEmbedUrl = (url: string) => {
    if (url.includes('vimeo')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    } else {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
      {!showVideo ? (
        <div
          className={`${aspectRatio === "video" ? "aspect-video" : "aspect-[9/16]"} relative group cursor-pointer`}
          onClick={() => setShowVideo(true)}
        >
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              if (video.url.includes('youtube')) {
                // Fallback to medium quality if maxresdefault doesn't exist
                const videoId = video.url.split('v=')[1];
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
              }
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-center">
              <FaPlay className="text-white text-4xl mb-2 mx-auto" />
              <span className="text-white font-medium">{video.title}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${aspectRatio === "video" ? "aspect-video" : "aspect-[9/16]"} relative`}> 
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getEmbedUrl(video.url)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  // State for scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  // State for gradient rotation
  const [gradientRotation, setGradientRotation] = useState(0);
  // Profile image path
  const profileImage = 'https://i.postimg.cc/zf2CT58W/Profile-pic.webphttps://i.postimg.cc/RVB9sg3L/Profile-pic.webp'; // Replace with your actual image path

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      id: 2,
      icon: FaInstagram,
      url: "https://www.instagram.com/shyam_bapodra/",
      label: "Instagram"
    },
    {
      id: 4,
      icon: FaEnvelope,
      url: "mailto:Shyambapodara@mediastello.com",
      label: "Email"
    }
  ];

  // Longform video data
  const longformVideos: Video[] = [
    {
      id: 1,
      title: "",
      url: "https://vimeo.com/1042850680"
    },
    {
      id: 2,
      title: "",
      url: "https://vimeo.com/1042850891"
    },
    {
      id: 3,
      title: "",
      url: "https://vimeo.com/1042850606"
    },
    {
      id: 4,
      title: "",
      url: "https://vimeo.com/1042850442"
    },
    {
      id: 5,
      title: "",
      url: "https://vimeo.com/1042850320"
    },
    {
      id: 6,
      title: "",
      url: "https://vimeo.com/1042850786"
    }
  ];

  // Shortform video data
  const shortformVideos: Video[] = [
    {
      id: 1,
      title: "",
      url: "https://vimeo.com/1048878464"
    },
    {
      id: 2,
      title: "",
      url: "https://vimeo.com/1048876419"
    },
    {
      id: 3,
      title: "",
      url: "https://vimeo.com/1048872225"
    },
    {
      id: 4,
      title: "",
      url: "https://vimeo.com/1048872189"
    },
    {
      id: 5,
      title: "",
      url: "https://vimeo.com/1048872157"
    },
    {
      id: 6,
      title: "",
      url: "https://vimeo.com/1048870530"
    }
  ];

  // Social proof metrics
  const socialProofMetrics: Metric[] = [
    {
      icon: FaEye,
      value: "+1.2M",
      label: "Organic Views",
      color: "text-blue-600"
    },
    {
      icon: FaUsers,
      value: "50K+",
      label: "Total Audience",
      color: "text-green-600"
    },
    {
      icon: FaCloudUploadAlt,
      value: "60+",
      label: "Projects Completed",
      color: "text-purple-600"
    }
  ];

  // Effect to handle scroll and update gradient rotation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      setGradientRotation(currentScrollY * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gradient style based on scroll position
  // Gradient style with multipoint linear gradient animation
const gradientStyle: React.CSSProperties = {
  background: `
    linear-gradient(
      45deg,
      rgba(255, 0, 150, 0.5) 0%,
      rgba(255, 150, 0, 0.5) 25%,
      rgba(0, 150, 255, 0.5) 50%,
      rgba(150, 0, 255, 0.5) 75%,
      rgba(0, 255, 150, 0.5) 100%
    )`,
  backgroundSize: '300% 300%',
  animation: 'gradientShift 10s ease infinite',
};


  return (
    <div className="min-h-screen relative">
      {/* Background gradient */}
      <div
        className="fixed inset-0 w-full h-full"
        style={gradientStyle}
      />

      <div className="relative z-10">
        {/* Floating icons */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <FaVideo
            className="absolute text-black/70 text-6xl opacity-10 animate-float"
            style={{ top: '10%', left: '5%', transform: `translateY(${scrollPosition * 0.2}px)` }}
          />
          <FaPlay
            className="absolute text-black/70 text-4xl opacity-10 animate-float"
            style={{ top: '70%', right: '10%', transform: `translateY(-${scrollPosition * 0.1}px)` }}
          />
          <FaFilm
            className="absolute text-black/70 text-5xl opacity-10 animate-float"
            style={{ bottom: '20%', left: '15%', transform: `translateY(${scrollPosition * 0.3}px)` }}
          />
          <FaCode
            className="absolute text-black/70 text-4xl opacity-10 animate-float"
            style={{ top: '30%', right: '20%', transform: `translateY(${scrollPosition * 0.2}px)` }}
          />
          <FaCamera
            className="absolute text-black/70 text-5xl opacity-10 animate-float"
            style={{ bottom: '30%', right: '5%', transform: `translateY(-${scrollPosition * 0.1}px)` }}
          />
          <FaLightbulb
            className="absolute text-black/70 text-4xl opacity-10 animate-float"
            style={{ top: '50%', left: '25%', transform: `translateY(${scrollPosition * 0.3}px)` }}
          />
          <FaMagic
            className="absolute text-black/70 text-5xl opacity-10 animate-float"
            style={{ bottom: '10%', left: '35%', transform: `translateY(-${scrollPosition * 0.2}px)` }}
          />
          <FaPalette
            className="absolute text-black/70 text-4xl opacity-10 animate-float"
            style={{ top: '60%', right: '30%', transform: `translateY(${scrollPosition * 0.1}px)` }}
          />
        </div>

        {/* Main content container */}
        <div className="container mx-auto px-4">
          {/* Profile section */}
          <section className="flex items-center justify-center py-20">
            <div className="text-center">
              {/* Profile image */}
              <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <div className="w-full h-full" style={{ backgroundImage: `url(${profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              </div>
              {/* Profile name */}
              <h1 className="text-4xl font-light text-black mb-2 bg-white/20 backdrop-blur-sm rounded-xl p-2 shadow-md border border-white/20 hover:border-white/80 transition-all duration-300" style={{fontFamily: 'Palatino'}}>
                Shyam Bapodra
              </h1>
              {/* Profile title */}
              <p className="text-xl text-black mb-4 bg-white/20 backdrop-blur-sm rounded-xl p-2 shadow-md border border-white/20 hover:border-white/80 transition-all duration-300" style={{fontFamily: 'Palatino'}}>
              High-Impact Video Innovator
              </p>

              {/* Social links */}
              <div className="flex justify-center space-x-4 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>

              {/* Profile description */}
              <div className="max-w-2xl mx-auto text-black leading-relaxed bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20 hover:border-white/80 transition-all duration-300" style={{fontFamily: 'Palatino'}}>
                <p>
                With 3+ years of experience in video editing, I excel at turning raw footage into captivating stories. My passion is crafting visually striking content that resonates with audiences on any platform.
                </p>
              </div>
            </div>
          </section>

          {/* Longform projects section */}
          <section className="py-16">
            <h2 className="text-4xl font-light text-black text-center mb-12 bg-white/20 backdrop-blur-sm rounded-xl p-2 shadow-md border border-white/20 hover:border-white/80 transition-all duration-300" style={{fontFamily: 'Palatino'}}>
            Longform Mastery
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {longformVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  aspectRatio="video"
                />
              ))}
            </div>
          </section>

          {/* Shortform content section */}
          <section className="py-16">
            <h2 className="text-4xl font-light text-black text-center mb-12 bg-white/20 backdrop-blur-sm rounded-xl p-2 shadow-md border border-white/20 hover:border-white/80 transition-all duration-300" style={{fontFamily: 'Palatino'}}>
            Shortform Brilliance
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {shortformVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  aspectRatio="vertical"
                />
              ))}
            </div>
          </section>

          {/* Professional achievements section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-light text-black text-center mb-12 bg-white/20 backdrop-blur-sm rounded-xl p-2 shadow-md border border-white/20 hover:border-white/80 transition-all duration-300" style={{fontFamily: 'Palatino'}}>
              Proven Expertise
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {socialProofMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center transform transition-transform hover:scale-105"
                  >
                    <metric.icon
                      className={`mx-auto text-5xl mb-4 ${metric.color}`}
                    />
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">
                      {metric.value}
                    </h3>
                    <p className="text-gray-600">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-black mt-8 max-w-2xl mx-auto bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20 hover:border-white/80 transition-all duration-300" style={{fontFamily: 'Palatino'}}>
              Transforming ideas into engaging video stories that captivate audiences and spark conversations across platforms.
              </p>
            </div>
          </section>

          {/* Call to action section */}
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl py-20 my-16 text-center shadow-2xl">
            <h3 className="text-4xl font-light text-gray-900 mb-6">
            Let's make magic happen with unforgettable content.
            </h3>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Ready to watch your vision unfold on screen?
            </p>
            <a
              href="https://calendly.com/shyambapodra-mediastello/the-blueprint-to-your-next-viral-video"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-10 py-4 rounded-full hover:bg-gray-700 transition-colors inline-block"
            >
              Turn My Videos Viral!
            </a>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center py-10 text-gray-500 relative z-10">
          © 2024 Video Portfolio. All Rights Reserved.
        </footer>
      </div>

      {/* CSS Animation */}
      <style jsx global>{`
         @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
      `}</style>
    </div>
  );
};

export default App;