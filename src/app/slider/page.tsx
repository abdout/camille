import Slider from '@/components/slider';
import items from '@/components/slider/camillemormal.json';

export default function Home() {
  return (
    <main>
      <Slider items={items} />
    </main>
  );
}
