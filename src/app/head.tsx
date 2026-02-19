export default function Head() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/brand/hero.jpg"
        type="image/jpeg"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="video"
        href="/brand/hero.webm"
        type="video/webm"
        fetchPriority="high"
      />
      <link rel="preload" as="video" href="/brand/hero.mp4" type="video/mp4" />
    </>
  );
}
