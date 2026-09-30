export default function Loading() {
  return (
    <div className="container-page flex min-h-[70vh] items-center" role="status">
      <div className="w-full">
        <p className="eyebrow pb-4">Loading</p>
        <div className="h-px w-full overflow-hidden bg-border">
          <div className="h-full w-1/3 animate-pulse bg-foreground" />
        </div>
      </div>
    </div>
  );
}
