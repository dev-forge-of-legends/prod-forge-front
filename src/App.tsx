import { DiceModal } from "@components/molecules";
import { DailyReward } from "@components/molecules/DailyReward/DailyReward";
import { HomeDashboard } from "@components/organisms/home-dashboard/HomeDashboard";
import { PrivateRoute } from "@components/organisms/PrivateRoute/PrivateRoute";
import Settings from "@pages/Settings/Settings";
import Shop from "@pages/Shop/Shop";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { BackgroundWrapperLayout } from "./components";
import DashboardLayout from "./layouts/Layout";
import ComingSoon from "./pages/Development/ComingSoon";
import NotFound from "./pages/Error/NotFound";
import AchievementPage from "./pages/GamePlay/AchievementPage";
import IndividualGame from "./pages/GamePlay/IndividualGame";
import LudoGame from "./pages/GamePlay/LudoGame";
import TeamGame from "./pages/GamePlay/TeamGame";
import HowToPlay from "./pages/Help/HowToPlay";
import Privacy from "./pages/Help/Privacy";
import SweepRules from "./pages/Help/SweepRules";
import Terms from "./pages/Help/Terms";
import Home from "./pages/Home";
import IndividualMatch from "./pages/Match/Individual/IndividualMatch";
import IndividualLayout from "./pages/Match/Individual/Layout";
import MatchHistories from "./pages/Match/MatchHistories";
import AllTeamMatches from "./pages/Match/Team/AllTeamMatches";
import CreateTeamMatches from "./pages/Match/Team/CreateTeamMatches";
import TeamMatchDetails from "./pages/Match/Team/matchInfo/teamMatchDetails";
import TeamMatchInfo from "./pages/Match/Team/TeamMatchInfo";
import Profile from "./pages/Profile/Profile";
import ResetPassword from "./pages/Security/ResetPassword";
import ChallengeAgreement from "./pages/Team/ChallengeAgreement";
import ChallengeTeams from "./pages/Team/ChallengeTeams";
import CreateTeam from "./pages/Team/CreateTeam";
import JoinRequest from "./pages/Team/JoinRequest";
import JoinTeam from "./pages/Team/JoinTeam";
import TeamChat from "./pages/Team/TeamChat";
import TeamDashboard from "./pages/Team/TeamDashboard";
import TeamInfo from "./pages/Team/TeamInfo";
import TeamMemberLayout from "@components/organisms/teamMembers";

const App = () => {
  return (
    <div className="flex min-h-screen max-w-screen quicksand-font">
      <main className="flex-1 max-w-screen">
        <Routes>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route
            path="/reset-password"
            element={
              <PrivateRoute>
                <ResetPassword />
              </PrivateRoute>
            }
          />

          <Route element={<BackgroundWrapperLayout />}>
            <Route
              path="/coming-soon"
              element={
                <PrivateRoute>
                  <ComingSoon />
                </PrivateRoute>
              }
            />

            <Route path="/how" element={<HowToPlay />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sweep" element={<SweepRules />} />
          </Route>

          {/* layout with sidebar for HomeDashboard */}
          <Route element={<DashboardLayout />}>
            {/* demo/UI routes */}
            <Route path="/ludo-game-ui" element={<LudoGame />} />
            <Route
              path="/create-team-matches"
              element={
                <PrivateRoute>
                  <CreateTeamMatches />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-dashboard"
              element={
                <PrivateRoute>
                  <TeamDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/challenge-teams"
              element={
                <PrivateRoute>
                  <ChallengeTeams />
                </PrivateRoute>
              }
            />
            <Route
              path="/challenge-agreement"
              element={
                <PrivateRoute>
                  <ChallengeAgreement />
                </PrivateRoute>
              }
            />
            <Route
              path="/individual-all-matches"
              element={
                <PrivateRoute>
                  <IndividualLayout />
                </PrivateRoute>
              }
            />
            <Route
              path="/match-histories"
              element={
                <PrivateRoute>
                  <MatchHistories />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-team"
              element={
                <PrivateRoute>
                  <CreateTeam />
                </PrivateRoute>
              }
            />
            <Route
              path="/how-to-play"
              element={
                <PrivateRoute>
                  <HowToPlay />
                </PrivateRoute>
              }
            />
            <Route
              path="/privacy-and-policy"
              element={
                <PrivateRoute>
                  <Privacy />
                </PrivateRoute>
              }
            />
            <Route
              path="/terms-and-condition"
              element={
                <PrivateRoute>
                  <Terms />
                </PrivateRoute>
              }
            />
            <Route
              path="/sweep-rules"
              element={
                <PrivateRoute>
                  <SweepRules />
                </PrivateRoute>
              }
            />
            <Route
              path="/join-team"
              element={
                <PrivateRoute>
                  <JoinTeam />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-info"
              element={
                <PrivateRoute>
                  <TeamInfo />
                </PrivateRoute>
              }
            />
            <Route
              path="/join-requests"
              element={
                <PrivateRoute>
                  <JoinRequest />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-chat"
              element={
                <PrivateRoute>
                  <TeamChat />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-all-matches"
              element={
                <PrivateRoute>
                  <AllTeamMatches />
                </PrivateRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <PrivateRoute>
                  <AchievementPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/daily"
              element={
                <PrivateRoute>
                  <DailyReward />
                </PrivateRoute>
              }
            />
            <Route
              path="/dice"
              element={
                <PrivateRoute>
                  <DiceModal />
                </PrivateRoute>
              }
            />

            {/* add more routes here that should show the sidebar */}
            {/* protected routes */}
            <Route
              path="/homedashboard"
              element={
                <PrivateRoute>
                  <HomeDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-dashboard"
              element={
                <PrivateRoute>
                  <TeamDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/team-match-info"
              element={
                <PrivateRoute>
                  <TeamMatchInfo />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-match-details"
              element={
                <PrivateRoute>
                  <TeamMatchDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-individual-match"
              element={
                <PrivateRoute>
                  <IndividualMatch />
                </PrivateRoute>
              }
            />
            <Route
              path="/individual-game"
              element={
                <PrivateRoute>
                  <IndividualGame />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-game"
              element={
                <PrivateRoute>
                  <TeamGame />
                </PrivateRoute>
              }
            />
            <Route
              path="/ludo-game"
              element={
                <PrivateRoute>
                  <LudoGame />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-matches"
              element={
                <PrivateRoute>
                  <CreateTeamMatches />
                </PrivateRoute>
              }
            />
            <Route
              path="/challenge-teams"
              element={
                <PrivateRoute>
                  <ChallengeTeams />
                </PrivateRoute>
              }
            />
            <Route
              path="/challenge-agreement"
              element={
                <PrivateRoute>
                  <ChallengeAgreement />
                </PrivateRoute>
              }
            />
            <Route
              path="/match-histories"
              element={
                <PrivateRoute>
                  <MatchHistories />
                </PrivateRoute>
              }
            />
            <Route
              path="/shop"
              element={
                <PrivateRoute>
                  <Shop />
                </PrivateRoute>
              }
            />
             <Route
              path="/teammembers"
              element={
                <PrivateRoute>
                  <TeamMemberLayout/>
                </PrivateRoute>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>

        <Toaster position="top-right" />
      </main>
    </div>
  );
};

export default App;
