import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PROFILES = [
  { name: "User 1", color: "bg-blue-500" },
  { name: "User 2", color: "bg-red-500" },
  { name: "Kids", color: "bg-green-500" },
];

export default function Profiles() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center text-white">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-medium mb-8"
      >
        Who's watching?
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {PROFILES.map((profile, index) => (
          <motion.div
            key={profile.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate("/browse")}
            className="group flex flex-col items-center gap-4 cursor-pointer"
          >
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded overflow-hidden transition-all duration-300 group-hover:ring-4 group-hover:ring-white ${profile.color} flex items-center justify-center`}>
              <span className="text-4xl font-bold">{profile.name[0]}</span>
            </div>
            <span className="text-gray-400 group-hover:text-white transition-colors text-lg">
              {profile.name}
            </span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: PROFILES.length * 0.1 }}
          className="group flex flex-col items-center gap-4 cursor-pointer"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded border-2 border-gray-600 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-600 group-hover:border-white">
            <Plus size={48} className="text-gray-600 group-hover:text-white" />
          </div>
          <span className="text-gray-400 group-hover:text-white transition-colors text-lg">
            Add Profile
          </span>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 border border-gray-600 text-gray-600 px-8 py-2 text-lg uppercase tracking-widest hover:text-white hover:border-white transition-all"
      >
        Manage Profiles
      </motion.button>
    </div>
  );
}
