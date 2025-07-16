import Slider from '@/components/slider';
import items from '@/components/slider/camillemormal.json';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Slider items={items} />
    </main>
  );
}
