import { Copy, Eye, Calendar, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FormatDate } from "../utlis/formatDate";

const ViewPaste = () => {
  const { id } = useParams();

  console.log(id)

  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.filter((paste) => paste._id === id)[0];

  console.log("Paste->",paste);

  if (!paste) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
            <Eye className="text-slate-400" size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-slate-300 mb-2">Note not found</h2>
          <p className="text-slate-400 mb-6">The note you're looking for doesn't exist or has been deleted.</p>
          <a 
            href="/pastes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Back to Notes
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <a 
              href="/pastes"
              className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg hover:bg-slate-600/50 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="text-slate-300" size={20} />
            </a>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                Viewing Note
              </h1>
              <p className="text-slate-400">Read-only view of your saved note</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-slate-400 text-sm font-mono">note-viewer</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar size={16} />
                  <span>{FormatDate(paste.createdAt)}</span>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg hover:bg-green-500/20 hover:border-green-400 transition-all duration-300 hover:scale-105 group"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to Clipboard");
                  }}
                >
                  <Copy className="text-slate-300 group-hover:text-green-400 transition-colors duration-300" size={18} />
                  <span className="text-slate-300 group-hover:text-green-400 transition-colors duration-300 text-sm font-medium">Copy</span>
                </button>
              </div>
            </div>

            <input
              type="text"
              value={paste.title}
              disabled
              className="w-full bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-3 text-xl font-semibold text-white cursor-not-allowed"
            />
          </div>

          <div className="relative">
            <textarea
              value={paste.content}
              disabled
              className="w-full bg-slate-900/50 p-6 text-amber-50 font-mono text-base leading-relaxed resize-none cursor-text border-none outline-none"
              rows={24}
            />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-4">
              <div className="text-slate-500 text-sm">
                {paste.content.length} characters
              </div>
              <div className="text-slate-500 text-sm">
                {paste.content.split('\n').length} lines
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-800/30 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="text-slate-400 text-sm">
                💡 This is a read-only view. 
                <a href={`/?pasteId=${paste._id}`} className="text-violet-400 hover:text-violet-300 ml-1 underline">
                  Click here to edit
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Note loaded successfully
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-full text-slate-400 text-sm">
            <Eye size={16} />
            Viewing in read-only mode
          </div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
};

export default ViewPaste;