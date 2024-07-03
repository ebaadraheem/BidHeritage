
import Main from "./components/Main";

export const metadata = {
  title: "Home",
  description: "Discover and bid on unique antiques at BidHeritage. Connect with sellers offering rare and valuable items. Join our community today!",
};

export default function Home() {
  return (
    <>
      <div>
        <div className="min-h-[100vh] flex flex-col">
          <Main />
        </div>
      </div>
    </>
  );
}
