import Hero from "../components/Home/Hero/Hero";
import CategoryCard from "../components/Home/CategoryCard/CategoryCard";
import StatementContainer from "../components/Home/StatementContainer/StatementContainer";
import EmailSubscription from "../components/Home/EmailSubscription/EmailSubscription";

function Home() {
  return (
    <section className="home mt-space">
      <Hero />
      <CategoryCard />
      <StatementContainer />
      <EmailSubscription />
    </section>
  );
}

export default Home;
