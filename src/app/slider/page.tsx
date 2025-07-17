import Slider from '@/components/slider';

// Load the same data that the Works view consumes (compiled at build-time from the `public` folder)
// This keeps Slider fully static and avoids runtime fetch issues on the server.
import homeData from '../../../public/data/home.json';

export default function SliderPage() {
  return (
    <div className="overflow-hidden">
      {/* Use identical works list so imagery & slugs stay in sync */}
      <Slider items={homeData.worksList} />
    </div>
  );
}
