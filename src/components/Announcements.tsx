import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role as string | undefined;

  if (!userId) {
    return <div>No user authenticated</div>; 
  }

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId } } },
    student: { students: { some: { id: userId } } },
    parent: { students: { some: { parentId: userId } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  // Warna latar belakang untuk setiap pengumuman
  const bgColors = ["bg-lamaSkyLight", "bg-lamaPurpleLight", "bg-lamaYellowLight"];

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View all</span>
      </div>

      {/* Handling jika tidak ada pengumuman */}
      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No announcements available</div>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {data.map((announcement, index) => (
            <div key={announcement.id} className={`p-4 rounded-md ${bgColors[index] || "bg-gray-200"}`}>
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{announcement.title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {new Intl.DateTimeFormat("en-US").format(new Date(announcement.date))}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{announcement.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;