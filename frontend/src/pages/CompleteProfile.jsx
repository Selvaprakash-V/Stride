import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { userApi } from "../api/users";

function CompleteProfile() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useUser();
  const [profileType, setProfileType] = useState("student");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    // student fields
    school: "",
    graduationYear: "",
    languages: "",
    // company fields
    companyName: "",
    hiringFor: "",
    openPositions: "",
  });

  if (!isLoaded) return null;
  if (!isSignedIn) return <div className="p-8">Please sign in first.</div>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { profileType, profileData: {} };
      if (profileType === "student") {
        payload.profileData = {
          school: form.school,
          graduationYear: form.graduationYear,
          languages: form.languages.split(",").map((s) => s.trim()).filter(Boolean),
        };
      } else {
        payload.profileData = {
          companyName: form.companyName,
          hiringFor: form.hiringFor,
          openPositions: form.openPositions,
        };
      }

      await userApi.createProfile(payload);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold mb-4">Finish setting up your account</h2>
        <p className="text-sm text-slate-400 mb-6">Tell us a bit about yourself so we can tailor the experience.</p>

        <form onSubmit={handleSubmit} className="space-y-4 bg-base-100 p-6 rounded-lg shadow">
          <div className="flex gap-4">
            <label className={`btn ${profileType === 'student' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setProfileType('student')}>Student</label>
            <label className={`btn ${profileType === 'company' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setProfileType('company')}>Company / Recruiter</label>
          </div>

          {profileType === 'student' ? (
            <div className="space-y-3">
              <div>
                <label className="label">School</label>
                <input name="school" value={form.school} onChange={handleChange} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Graduation Year</label>
                <input name="graduationYear" value={form.graduationYear} onChange={handleChange} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Languages (comma separated)</label>
                <input name="languages" value={form.languages} onChange={handleChange} className="input input-bordered w-full" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="label">Company Name</label>
                <input name="companyName" value={form.companyName} onChange={handleChange} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Hiring For</label>
                <input name="hiringFor" value={form.hiringFor} onChange={handleChange} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Open Positions (optional)</label>
                <input name="openPositions" value={form.openPositions} onChange={handleChange} className="input input-bordered w-full" />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Save & Continue'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default CompleteProfile;
