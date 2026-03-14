export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <div className="skeleton h-8 w-48 rounded-xl" />
        <div className="skeleton h-4 w-72 rounded-lg" />
      </div>
      {/* Stat cards skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="glass rounded-2xl p-5 space-y-4">
            <div className="flex justify-between">
              <div className="skeleton h-3 w-24 rounded" />
              <div className="skeleton h-8 w-8 rounded-lg" />
            </div>
            <div className="skeleton h-8 w-20 rounded-lg" />
            <div className="skeleton h-3 w-32 rounded" />
          </div>
        ))}
      </div>
      {/* Charts skeleton */}
      <div className="grid gap-4 lg:grid-cols-7">
        <div className="glass rounded-2xl p-5 col-span-4 space-y-4">
          <div className="skeleton h-4 w-36 rounded" />
          <div className="skeleton h-[280px] w-full rounded-xl" />
        </div>
        <div className="glass rounded-2xl p-5 col-span-3 space-y-5">
          <div className="skeleton h-4 w-32 rounded" />
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="skeleton w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3 w-28 rounded" />
                <div className="skeleton h-2 w-20 rounded" />
              </div>
              <div className="skeleton h-6 w-10 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
