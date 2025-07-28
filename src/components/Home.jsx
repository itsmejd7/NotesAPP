import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-2">
            {pasteId ? 'Edit Your Note' : 'Create New Note'}
          </h1>
          <p className="text-slate-400 text-lg">Write, save, and share your notes effortlessly</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700/50">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-6 py-4 text-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70"
                type="text"
                placeholder="Enter your note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={createPaste}
                className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
              >
                <PlusCircle size={20} />  
                {pasteId ? 'Update Note' : 'Create Note'}
              </button>
              
              <button
                onClick={resetPaste}
                className="px-6 py-4 bg-slate-600/50 text-slate-300 font-semibold rounded-xl hover:bg-slate-600/70 hover:text-white transform hover:scale-105 transition-all duration-300 border border-slate-500/50"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl p-6 text-amber-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 resize-none font-mono text-base leading-relaxed hover:bg-slate-900/90"
              value={value}
              placeholder="Start writing your note here... 

You can write anything - code snippets, thoughts, lists, or documentation.
Your notes are automatically saved when you click Create/Update."
              onChange={(e) => setValue(e.target.value)}
              rows={24}
            />
            
            <div className="absolute bottom-4 right-4 text-slate-500 text-sm">
              {value.length} characters
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-slate-400 text-sm">
            <div className="flex items-center gap-4">
              <span>💡 Tip: Use Ctrl/Cmd + S to quick save</span>
            </div>
            <div>
              {pasteId && <span className="text-violet-400">Editing existing note</span>}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-full text-slate-400 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Auto-save enabled
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

export default Home;