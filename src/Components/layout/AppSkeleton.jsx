import { Card, Skeleton } from "antd";

const AppSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6 md:p-8 lg:p-12">
      <header className="text-center mx-auto max-w-7xl my-12">
        <div className="mb-4">
          <Skeleton.Input
            active
            size="large"
            className="w-1/2 mx-auto"
            style={{ height: "48px" }}
          />
        </div>
        <Skeleton.Input
          active
          size="default"
          className="w-1/3 mx-auto my-3"
          style={{ height: "32px" }}
        />
        
        <Card className="mt-8 mb-6 shadow-sm rounded-lg overflow-hidden border-0">
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton.Button
                  key={i}
                  active
                  size="small"
                  className="w-24"
                />
              ))}
            </div>
            <Skeleton.Button active size="small" className="w-24" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton.Input
                key={i}
                active
                size="default"
                className="w-full"
              />
            ))}
          </div>
        </Card>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="h-48 bg-gray-200 animate-pulse" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <Skeleton.Input
                    active
                    size="small"
                    className="w-3/4 mb-2"
                  />
                  <Skeleton.Input
                    active
                    size="small"
                    className="w-1/2"
                  />
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
              </div>

              <div className="flex justify-between items-center mb-4">
                <Skeleton.Input
                  active
                  size="small"
                  className="w-1/3"
                />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="h-6 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>

              <div className="h-8 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </Card>
        ))}
      </main>

      <div className="flex justify-end mt-8">
        <Skeleton.Button active size="small" className="w-64" />
      </div>
    </div>
  );
};

export default AppSkeleton; 