import fs from 'fs';
import path from 'path';
import { useState } from 'react';

export default function Home({ videoFiles }) {
  // State untuk pencarian
  const [searchQuery, setSearchQuery] = useState('');

  // Filter video berdasarkan query pencarian
  const filteredVideos = videoFiles.filter((file) =>
    file.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ambil 3 video terbaru
  const latestVideos = filteredVideos.slice(-3);

  // Ambil 3 video pertama sebagai video populer
  const popularVideos = filteredVideos.slice(0, 3);

  // Ambil video lainnya untuk saran video
  const recommendedVideos = filteredVideos.slice(1, 6);

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>
          <h1>GAYOK21</h1>
        </div>
        <nav style={styles.nav}>
          <a href="#" style={styles.navLink}>Home</a>
          <a href="#" style={styles.navLink}>About</a>
          <a href="#" style={styles.navLink}>Contact</a>
        </nav>
      </header>

      <main style={styles.main}>
        {/* Pencarian */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Cari video..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Video Terbaru */}
        <section>
          <h2 style={styles.sectionTitle}>Video Terbaru</h2>
          <div style={styles.videoGrid}>
            {latestVideos.map((file, index) => (
              <div key={index} style={styles.videoCard}>
                <video width="100%" controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()}>
                  <source src={`/videos/${file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3 style={styles.videoTitle}>{file.replace('.mp4', '')}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Video Populer */}
        <section>
          <h2 style={styles.sectionTitle}>Video Populer</h2>
          <div style={styles.videoGrid}>
            {popularVideos.map((file, index) => (
              <div key={index} style={styles.videoCard}>
                <video width="100%" controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()}>
                  <source src={`/videos/${file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3 style={styles.videoTitle}>{file.replace('.mp4', '')}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Saran Video */}
        <section>
          <h2 style={styles.sectionTitle}>Saran Video</h2>
          <div style={styles.videoGrid}>
            {recommendedVideos.map((file, index) => (
              <div key={index} style={styles.videoCard}>
                <video width="100%" controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()}>
                  <source src={`/videos/${file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3 style={styles.videoTitle}>{file.replace('.mp4', '')}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Menampilkan Semua Video */}
        <section>
          <h2 style={styles.sectionTitle}>Semua Video</h2>
          <div style={styles.videoGrid}>
            {filteredVideos.map((file, index) => (
              <div key={index} style={styles.videoCard}>
                <video width="100%" controls controlsList="nodownload" onContextMenu={(e) => e.preventDefault()}>
                  <source src={`/videos/${file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3 style={styles.videoTitle}>{file.replace('.mp4', '')}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const videoDirectory = path.join(process.cwd(), 'public/videos');
  const videoFiles = fs.readdirSync(videoDirectory).filter(file => file.endsWith('.mp4'));

  return {
    props: {
      videoFiles,
    },
  };
}

const styles = {
  header: {
    backgroundColor: '#222',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  main: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  videoCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  videoTitle: {
    fontSize: '18px',
    padding: '10px',
    backgroundColor: '#222',
    color: 'white',
    margin: 0,
  },
  searchBox: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    padding: '10px',
    width: '80%',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
};
