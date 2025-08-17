export default function Footer() {
  return (
    <footer className="py-4 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto ">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="space-y-2 text-left">
            <h1 className="text-xl md:text-3xl font-bold text-primary">Arno Christie</h1>
            <p>Building the future with AI and modern web technologies.</p>
          </div>
          <div></div>
          <div className="text-left">
            <p>&copy; 2025 Made with &#x1F49B; and &lt;&gt; by Arno Christie.</p>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-6 text-center text-muted-foreground">
          Built with Next.js, Typescript, and Tailwind CSS
        </div>
      </div>
    </footer>
  );
}