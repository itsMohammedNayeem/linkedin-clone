import UserInformation from "@/components/UserInformation";

export default function Home() {
  return (
    <div className="flex">
      <section>
        {/* UserInformation */}
        <UserInformation />
      </section>

      <section>
        {/* PostForm */}
        {/* PostFeed */}
      </section>

      <section>{/* Widget */}</section>
    </div>
  );
}
