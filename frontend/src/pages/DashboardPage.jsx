import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = (participantId = null) => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
        participantId: participantId,
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;
    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  return (
    <div className="min-h-screen mesh-bg relative flex flex-col overflow-x-hidden">
      <div className="noise-overlay" />

      <Navbar />

      <main className="relative z-10 flex-1">
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
          </motion.div>
        </div>
      </main>

      {/* Decorative Blob */}
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </div>
  );
}

export default DashboardPage;
