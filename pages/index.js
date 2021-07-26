import Head from "next/head";
import { useState } from "react";
import Gallery from "../components/ImageDetail";
import styles from "../styles/Home.module.css";

export default function Home({ stuff }) {
  const [photos, setPhotos] = useState(stuff);
  const [search, setSearch] = useState("");
  return (
    <div className={styles.container}>
      <Head>
        <title>Photo Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <input
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          type="text"
          placeholder="Search for an image"
        ></input>
        <button
          className="button"
          disabled={search === ""}
          onClick={async () => {
            const results = await fetch(
              `http://localhost:1337/photos?name=${search}`
            );
            const details = await results.json(); 
            setPhotos(await details);
          }}
        >
          Find
        </button>
       
        <div className={styles.fade}>
          <div className={styles.gridContainer}>
            {photos &&
              photos.map((detail) => (
                <Gallery
                  key={detail.id}
                  thumbnailUrl={detail.img[0].formats.small.url}
                  title={detail.name}
                  id={detail.id}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const results = await fetch("http://localhost:1337/photos");
  const stuff = await results.json();
 
  return {
    props: { stuff },
  };
}
