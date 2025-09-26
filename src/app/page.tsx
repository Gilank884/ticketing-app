import BannerSlider from "../components/BannerSlider";
import EventList from "../components/EventList";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <BannerSlider />
      <h2 className="text-xl font-bold mt-10 mb-4">Event</h2>
      <EventList />
    </main>
  );
}
