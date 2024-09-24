import WebhookTester from "@/components/webhook-tester";

export default function Page() {
  return (
    <main>
      <section className="p-4 py-12">
        <div className="wrapper max-w-4xl mx-auto">
          <WebhookTester />
        </div>
      </section>
    </main>
  );
}
