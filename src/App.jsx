import React, { useState, useEffect } from 'react';
import { INITIAL_USER_PROFILE, INITIAL_JOBS } from './data/mockData';
import { SUPPORTED_COUNTRIES, detectUserLocation } from './services/locationService';
import DynamicIsland from './components/DynamicIsland';
import LiquidTabBar from './components/LiquidTabBar';
import RadarView from './components/RadarView';
import JobsFeedView from './components/JobsFeedView';
import PostJobView from './components/PostJobView';
import AIGeneratorView from './components/AIGeneratorView';
import ProfileView from './components/ProfileView';
import CompanyProfileModal from './components/CompanyProfileModal';
import CandidateProfileModal from './components/CandidateProfileModal';

export default function App() {
  // Load state from localStorage or initial defaults
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('sagav_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === "Lucas Silveira") {
          return INITIAL_USER_PROFILE;
        }
        return parsed;
      }
      return INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('sagav_jobs');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasCbeMoz = parsed.some(j => j.sourceType === 'cbe' || j.id === 'job-mz-1');
        if (!hasCbeMoz) {
          return INITIAL_JOBS;
        }
        return parsed;
      }
      return INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [activeTab, setActiveTab] = useState('radar');
  const [selectedJobForAI, setSelectedJobForAI] = useState(jobs[0]);
  const [selectedJobForDetail, setSelectedJobForDetail] = useState(null);
  const [selectedCompanyForModal, setSelectedCompanyForModal] = useState(null);
  const [showCandidateProfileModal, setShowCandidateProfileModal] = useState(false);
  const [activeNiche, setActiveNiche] = useState(userProfile.targetNiche);
  const [onlyMyNiche, setOnlyMyNiche] = useState(true);

  // Geographic state
  const [locationScope, setLocationScope] = useState(userProfile.locationScope || 'country');
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const matched = SUPPORTED_COUNTRIES.find(c => c.name === userProfile.country || c.code === userProfile.countryCode);
    return matched || SUPPORTED_COUNTRIES[0];
  });

  // Automatically detect user location once on first run if default
  useEffect(() => {
    const hasDetectedBefore = localStorage.getItem('sagav_location_detected');
    if (!hasDetectedBefore) {
      detectUserLocation().then((loc) => {
        if (loc.success) {
          const matchedCountry = SUPPORTED_COUNTRIES.find(c => c.code === loc.countryCode) || SUPPORTED_COUNTRIES[0];
          setSelectedCountry(matchedCountry);
          setUserProfile((prev) => ({
            ...prev,
            country: matchedCountry.name,
            countryCode: matchedCountry.code,
            flag: matchedCountry.flag,
            region: loc.region || prev.region,
            location: `${loc.region || prev.region}, ${matchedCountry.name}`
          }));
          localStorage.setItem('sagav_location_detected', 'true');
        }
      });
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sagav_user_profile', JSON.stringify({
        ...userProfile,
        locationScope,
        country: selectedCountry.name,
        countryCode: selectedCountry.code,
        flag: selectedCountry.flag
      }));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  }, [userProfile, locationScope, selectedCountry]);

  useEffect(() => {
    try {
      localStorage.setItem('sagav_jobs', JSON.stringify(jobs));
    } catch (e) {
      console.warn('Failed to save jobs to localStorage', e);
    }
  }, [jobs]);

  // Handle adding a new job (Post a Job / Como LinkedIn)
  const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  // Handle selecting a job to generate CV
  const handleSelectJobForAI = (job) => {
    setSelectedJobForAI(job);
    setActiveTab('ai');
  };

  // Handle updating profile
  const handleSaveProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    if (updatedProfile.targetNiche !== activeNiche) {
      setActiveNiche(updatedProfile.targetNiche);
    }
    if (updatedProfile.locationScope) {
      setLocationScope(updatedProfile.locationScope);
    }
    const matchedCountry = SUPPORTED_COUNTRIES.find(c => c.name === updatedProfile.country);
    if (matchedCountry) {
      setSelectedCountry(matchedCountry);
    }
  };

  // Handle manual GPS re-detection
  const handleDetectLocation = async () => {
    const loc = await detectUserLocation();
    if (loc.success) {
      const matched = SUPPORTED_COUNTRIES.find(c => c.code === loc.countryCode) || SUPPORTED_COUNTRIES[0];
      setSelectedCountry(matched);
      setUserProfile((prev) => ({
        ...prev,
        country: matched.name,
        countryCode: matched.code,
        flag: matched.flag,
        region: loc.region || prev.region,
        location: `${loc.region || prev.region}, ${matched.name}`
      }));
    }
  };

  return (
    <div className="app-viewport">
      {/* Dynamic Ambient Background Mesh */}
      <div className="ambient-mesh-canvas">
        <div className="mesh-blob blob-1" />
        <div className="mesh-blob blob-2" />
        <div className="mesh-blob blob-3" />
        <div className="mesh-blob blob-4" />
      </div>

      {/* Main Fluid Container (Clean & Responsive without fake phone border) */}
      <div className="sagav-main-container">
        {/* Top Control Capsule / Dynamic Island */}
        <DynamicIsland
          userProfile={{
            ...userProfile,
            country: selectedCountry.name,
            countryCode: selectedCountry.code,
            flag: selectedCountry.flag
          }}
          jobCount={jobs.length}
          activeNiche={onlyMyNiche ? userProfile.targetNiche : activeNiche}
          locationScope={locationScope}
          setLocationScope={setLocationScope}
          onOpenProfile={() => setActiveTab('profile')}
          onOpenAI={() => setActiveTab('ai')}
        />

        {/* Main Screen Content */}
        <div className="main-screen-content">
          {activeTab === 'radar' && (
            <RadarView
              jobs={jobs}
              userProfile={userProfile}
              onSelectJobForAI={handleSelectJobForAI}
              onViewJobDetails={(job) => setSelectedJobForDetail(job)}
              selectedCountry={selectedCountry}
              onOpenCompanyProfile={(company) => setSelectedCompanyForModal(company)}
              onOpenSyncOrImport={() => setActiveTab('post')}
            />
          )}

          {activeTab === 'feed' && (
            <JobsFeedView
              jobs={jobs}
              userProfile={userProfile}
              onSelectJobForAI={handleSelectJobForAI}
              onViewJobDetails={(job) => setSelectedJobForDetail(job)}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              locationScope={locationScope}
              setLocationScope={setLocationScope}
              onOpenCompanyProfile={(company) => setSelectedCompanyForModal(company)}
            />
          )}

          {activeTab === 'post' && (
            <PostJobView
              onAddJob={handleAddJob}
              setActiveTab={setActiveTab}
              onOpenCompanyProfile={(company) => setSelectedCompanyForModal(company)}
            />
          )}

          {activeTab === 'ai' && (
            <AIGeneratorView
              jobs={jobs}
              selectedJob={selectedJobForAI}
              setSelectedJob={setSelectedJobForAI}
              userProfile={userProfile}
              onOpenProfile={() => setActiveTab('profile')}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              userProfile={{
                ...userProfile,
                country: selectedCountry.name,
                countryCode: selectedCountry.code,
                flag: selectedCountry.flag,
                locationScope
              }}
              onSaveProfile={handleSaveProfile}
              onPreviewCandidateProfile={() => setShowCandidateProfileModal(true)}
            />
          )}
        </div>

        {/* Floating Liquid Glass Tab Bar */}
        <LiquidTabBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Job Details Drawer Modal */}
      {selectedJobForDetail && (
        <JobDetailModal
          job={selectedJobForDetail}
          onClose={() => setSelectedJobForDetail(null)}
          onGenerateAI={handleSelectJobForAI}
          onOpenCompanyProfile={(company) => setSelectedCompanyForModal(company)}
        />
      )}

      {/* Verified Company Profile Modal (Viewed by Candidate) */}
      {selectedCompanyForModal && (
        <CompanyProfileModal
          companyName={selectedCompanyForModal}
          jobs={jobs}
          onClose={() => setSelectedCompanyForModal(null)}
          onSelectJobForAI={handleSelectJobForAI}
        />
      )}

      {/* Verified Candidate Profile Modal (Viewed by Recruiter / Employer) */}
      {showCandidateProfileModal && (
        <CandidateProfileModal
          userProfile={userProfile}
          onClose={() => setShowCandidateProfileModal(false)}
        />
      )}
    </div>
  );
}
