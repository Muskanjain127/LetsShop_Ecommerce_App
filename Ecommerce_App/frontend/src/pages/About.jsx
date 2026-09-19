import React from 'react';

const About = () => {
  const socialBtnClass = "inline-block m-2.5 py-2.5 px-5 bg-zinc-800 text-white rounded-lg no-underline transition-all duration-300 border border-white/10 hover:-translate-y-0.5";

  return (
    <div className="max-w-[900px] mx-auto my-10 p-10 bg-zinc-900 rounded-2xl border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-center">
      <div
        aria-label="@Muskanjain127"
        className="w-[180px] h-[180px] rounded-full border-4 border-brand mb-5 shadow-[0_4px_20px_rgba(168,85,247,0.4)] inline-flex items-center justify-center bg-gradient-to-br from-brand to-brand-dark text-white text-6xl font-bold"
      >
        MJ
      </div>
      <h2 className="text-4xl mb-2.5 text-white">About Me</h2>
      <h3 className="text-2xl text-brand mb-4">Muskan Jain (@Muskanjain127)</h3>

      <p className="text-zinc-400 text-xl leading-relaxed max-w-[600px] mx-auto mb-8">
        <strong>Join the community and grow together!</strong> Welcome to my platform where we build, deploy, and scale highly engineered systems.
      </p>

      <div className="flex flex-wrap justify-center gap-2.5 mt-5">
        <a href="https://github.com/Muskanjain127" target="_blank" rel="noreferrer" className={socialBtnClass}>💻 GitHub</a>
        <a href="https://www.linkedin.com/in/muskan-jain-5388443bb" target="_blank" rel="noreferrer" className={`${socialBtnClass} bg-blue-500/20 border-blue-500 text-blue-500`}>💼 LinkedIn</a>
        <a href="mailto:muskanjain7206@gmail.com" className={socialBtnClass}>📧 Email</a>
      </div>
    </div>
  );
};

export default About;
