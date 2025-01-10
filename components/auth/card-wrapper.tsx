export default function CardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className=" bg-gray-50 min-h-screen flex items-center justify-center">
      <div className=" bg-gray-100 px-5 py-12 rounded-2xl shadow-lg md:w-96">
        <div className="px-8">{children}</div>
      </div>
    </section>
  );
}
