import React, { useEffect, useState } from 'react';
import { 
  FaVideo, 
  FaPlay, 
  FaFilm, 
  FaLinkedin, 
  FaInstagram, 
  FaTwitter, 
  FaEnvelope,
  FaEye,
  FaUsers,
  FaCloudUploadAlt,
  FaTimes
} from 'react-icons/fa';

const VideoCard = ({ video, aspectRatio = "video" }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    // Extract video ID from URL
    const videoId = video.url.split('v=')[1];
    // Get high quality thumbnail
    setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
  }, [video.url]);

  const getEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
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
            onError={(e) => {
              // Fallback to medium quality if maxresdefault doesn't exist
              const videoId = video.url.split('v=')[1];
              e.target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
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

export default function App2() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [gradientRotation, setGradientRotation] = useState(0);

  const socialLinks = [
    {
      id: 1,
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/your-profile",
      label: "LinkedIn"
    },
    {
      id: 2,
      icon: FaInstagram,
      url: "https://www.instagram.com/ithi.m0/",
      label: "Instagram"
    },
    {
      id: 3,
      icon: FaTwitter,
      url: "https://twitter.com/your-profile",
      label: "Twitter"
    },
    {
      id: 4,
      icon: FaEnvelope,
      url: "mailto:your.email@example.com",
      label: "Email"
    }
  ];

  const longformVideos = [
    {
      id: 1,
      title: "Corporate Brand Video",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 2,
      title: "Wedding Highlights",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 3,
      title: "Product Launch",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 4,
      title: "Documentary Short",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 5,
      title: "Event Coverage",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 6,
      title: "Music Video",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    }
  ];

  const shortformVideos = [
    {
      id: 1,
      title: "TikTok Promo",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 2,
      title: "Instagram Reel",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 3,
      title: "Social Ad",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 4,
      title: "Product Teaser",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 5,
      title: "Brand Story",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    },
    {
      id: 6,
      title: "Tutorial Clip",
      url: "https://www.youtube.com/watch?v=hatrtJIncLc"
    }
  ];

  const socialProofMetrics = [
    {
      icon: FaEye,
      value: "+1.2M",
      label: "Organic Views",
      color: "text-blue-600"
    },
    {
      icon: FaUsers,
      value: "500K+",
      label: "Total Audience",
      color: "text-green-600"
    },
    {
      icon: FaCloudUploadAlt,
      value: "120+",
      label: "Projects Completed",
      color: "text-purple-600"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      setGradientRotation(currentScrollY * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gradientStyle = {
    background: `conic-gradient(
      from ${gradientRotation}deg,
      rgba(59, 130, 246, 0.1) 0deg,
      rgba(16, 185, 129, 0.1) 120deg,
      rgba(139, 92, 246, 0.1) 240deg
    )`,
    transition: 'background 0.1s ease-out'
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 w-full h-full"
        style={gradientStyle}
      />

      <div className="relative z-10">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <FaVideo 
            className="absolute text-gray-100/50 text-6xl opacity-10 animate-float" 
            style={{ top: '10%', left: '5%', transform: `translateY(${scrollPosition * 0.2}px)` }} 
          />
          <FaPlay 
            className="absolute text-gray-100/50 text-4xl opacity-10 animate-float" 
            style={{ top: '70%', right: '10%', transform: `translateY(-${scrollPosition * 0.1}px)` }} 
          />
          <FaFilm 
            className="absolute text-gray-100/50 text-5xl opacity-10 animate-float" 
            style={{ bottom: '20%', left: '15%', transform: `translateY(${scrollPosition * 0.3}px)` }} 
          />
        </div>

        <div className="container mx-auto px-4">
          <section className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  Profile Photo
                </div>
              </div>
              <h1 className="text-4xl font-light text-gray-900 mb-2">
                Alex Rodriguez
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Creative Video Editor & Storyteller
              </p>
              
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

              <div className="max-w-2xl mx-auto text-gray-700 leading-relaxed">
                <p>
                  With over 5 years of experience in video editing, I specialize in transforming raw footage into compelling narratives. 
                  My passion lies in creating visually stunning content that connects with audiences across various platforms.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16">
            <h2 className="text-4xl font-light text-center mb-12 text-gray-800">
              Longform Projects
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

          <section className="py-16">
            <h2 className="text-4xl font-light text-center mb-12 text-gray-800">
              Shortform Content
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

          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-light text-center mb-12 text-gray-800">
                Professional Achievements
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
              <p className="text-center text-gray-600 mt-8 max-w-2xl mx-auto">
                Delivering high-quality video content that drives engagement and tells compelling stories across multiple platforms.
              </p>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl py-20 my-16 text-center shadow-2xl">
            <h3 className="text-4xl font-light text-gray-900 mb-6">
              Let's Create Something Amazing
            </h3>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Ready to transform your video vision into reality?
            </p>
            <a 
              href="https://calendly.com/your-calendar" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-10 py-4 rounded-full hover:bg-gray-700 transition-colors inline-block"
            >
              Book a Meeting
            </a>
          </section>
        </div>

        <footer className="text-center py-10 text-gray-500 relative z-10">
          © 2024 Video Portfolio. All Rights Reserved.
        </footer>
      </div>

      <style jsx global>{`
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
}