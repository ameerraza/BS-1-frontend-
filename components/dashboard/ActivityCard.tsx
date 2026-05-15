import ViewAllCard from "./ViewAllCard";

const ActivityCard = () => {
  const recentActivities = [
    {
      id: 1,
      title: "John Harper purchased 1-month subscription plan",
      text: "Successfully completed the subscription process",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg", // Add appropriate image path
      date: new Date().toISOString(),
    },
    {
      id: 2,
      title: "John Harper purchased 1-month subscription plan",
      text: "Successfully completed the subscription process",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg", // Add appropriate image path
      date: new Date().toISOString(),
    },
    {
      id: 3,
      title: "John Harper purchased 1-month subscription plan",
      text: "Successfully completed the subscription process",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg", // Add appropriate image path
      date: new Date().toISOString(),
    },
    {
      id: 4,
      title: "John Harper purchased 1-month subscription plan",
      text: "Successfully completed the subscription process",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg", // Add appropriate image path
      date: new Date().toISOString(),
    },
    {
      id: 5,
      title: "John Harper purchased 1-month subscription plan",
      text: "Successfully completed the subscription process",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg", // Add appropriate image path
      date: new Date().toISOString(),
    },
    {
      id: 6,
      title: "John Harper purchased 1-month subscription plan",
      text: "Successfully completed the subscription process",
      profileImage: "/path/to/profile-image.jpg", // Add appropriate image path
      date: new Date().toISOString(),
    },
  ];

  return (
    <ViewAllCard title="Activity Log" viewAllLink="#">
      <h3 className="text-md font-medium mb-2">Recent activities</h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex gap-4 bg-white p-4 rounded-lg">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img src={activity.profileImage} alt="Profile" />
            </div>

            <div className="flex-1">
              <h2 className="font-semibold ">{activity.title}</h2>
              <div className="pl-2 border-l-4 border-gray-300 my-2">
                <p className="text-gray-600 text-sm">{activity.text}</p>
              </div>
              <time className="text-sm text-gray-400">
                {new Date(activity.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
          </div>
        ))}
      </div>
    </ViewAllCard>
  );
};

export default ActivityCard;
