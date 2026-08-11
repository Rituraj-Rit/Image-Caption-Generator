import Navbar from './Navbar.jsx'
import Hero from './Hero.jsx'
import ImageUploader from './ImageUploader.jsx'
import CaptionGenerator from './CaptionGenerator.jsx'
import CaptionResult from './CaptionResult.jsx'
import HowItWorks from './HowItWorks.jsx'
import Footer from './Footer.jsx'

export default function GeneratorPage({ selectedImage, setSelectedImage, caption, status, error, onGenerateCaption, onError, clearCaption, clearImage, setStatus }) {
  return (
    <div className="app-shell min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <Navbar />
      <main className="relative">
        <Hero />
        <section id="generate" className="container mx-auto px-4 pb-20 pt-10 lg:px-6 lg:pt-16">
          <div className="mx-auto max-w-7xl space-y-10">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-accent/80">Generate Your Caption</p>
              <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Upload an image and let AI understand what it sees.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">Send your image to the existing backend API, receive a real AI caption, and copy it instantly.</p>
            </div>
            <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6 rounded-[2rem] border border-white/5 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl lg:p-8">
                <ImageUploader
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  onError={onError}
                  clearCaption={clearCaption}
                />
                <CaptionGenerator
                  selectedImage={selectedImage}
                  onGenerate={onGenerateCaption}
                  onError={onError}
                  status={status}
                  setStatus={setStatus}
                  clearImage={clearImage}
                />
              </div>
              <div className="space-y-6 rounded-[2rem] border border-white/5 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl lg:p-8">
                <CaptionResult caption={caption} status={status} error={error} onClear={clearCaption} />
              </div>
            </div>
          </div>
        </section>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
