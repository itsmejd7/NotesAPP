import { Calendar, Copy, Eye, PencilLine, Trash2, Search, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-2">
            My Notes Collection
          </h1>
          <p className="text-slate-400 text-lg">Manage and organize all your saved notes</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700/50">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="search"
                placeholder="Search your notes by title..."
                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl pl-12 pr-6 py-4 text-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 hover:bg-slate-700/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
              All Notes ({filteredPastes.length})
            </h2>
            {searchTerm && (
              <div className="text-slate-400 text-sm">
                Showing results for "{searchTerm}"
              </div>
            )}
          </div>

          <div className="space-y-6">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 hover:border-slate-500/50 hover:shadow-xl group"
                >
                  <div className="flex flex-col lg:flex-row gap-6 justify-between">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-semibold text-white group-hover:text-violet-300 transition-colors duration-300">
                        {paste?.title}
                      </h3>
                      <p className="text-slate-300 line-clamp-3 leading-relaxed">
                        {paste?.content}
                      </p>
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Calendar size={16} />
                        <span>{FormatDate(paste?.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end gap-4">
                      <div className="flex gap-2 flex-wrap">
                        <button className="p-3 bg-slate-600/50 border border-slate-500/50 rounded-lg hover:bg-blue-500/20 hover:border-blue-400 group/btn transition-all duration-300 hover:scale-105">
                          <a href={`/?pasteId=${paste?._id}`}>
                            <PencilLine
                              className="text-slate-300 group-hover/btn:text-blue-400 transition-colors duration-300"
                              size={18}
                            />
                          </a>
                        </button>

                        <button 
                          className="p-3 bg-slate-600/50 border border-slate-500/50 rounded-lg hover:bg-pink-500/20 hover:border-pink-400 group/btn transition-all duration-300 hover:scale-105"
                          onClick={() => handleDelete(paste?._id)}
                        >
                          <Trash2
                            className="text-slate-300 group-hover/btn:text-pink-400 transition-colors duration-300"
                            size={18}
                          />
                        </button>

                        <button className="p-3 bg-slate-600/50 border border-slate-500/50 rounded-lg hover:bg-orange-500/20 hover:border-orange-400 group/btn transition-all duration-300 hover:scale-105">
                          <a href={`/pastes/${paste?._id}`} target="_blank">
                            <Eye
                              className="text-slate-300 group-hover/btn:text-orange-400 transition-colors duration-300"
                              size={18}
                            />
                          </a>
                        </button>

                        <button
                          className="p-3 bg-slate-600/50 border border-slate-500/50 rounded-lg hover:bg-purple-500/20 hover:border-purple-400 group/btn transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            const shareUrl = `${window.location.origin}/pastes/${paste?._id}`;
                            navigator.clipboard.writeText(shareUrl);
                            toast.success("Share link copied to clipboard");
                          }}
                        >
                          <Share2
                            className="text-slate-300 group-hover/btn:text-purple-400 transition-colors duration-300"
                            size={18}
                          />
                        </button>

                        <button
                          className="p-3 bg-slate-600/50 border border-slate-500/50 rounded-lg hover:bg-green-500/20 hover:border-green-400 group/btn transition-all duration-300 hover:scale-105"
                          onClick={() => {
                            navigator.clipboard.writeText(paste?.content);
                            toast.success("Copied to Clipboard");
                          }}
                        >
                          <Copy
                            className="text-slate-300 group-hover/btn:text-green-400 transition-colors duration-300"
                            size={18}
                          />
                        </button>
                      </div>

                      <div className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                        {paste?.content?.length || 0} characters
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="mb-4">
                  <div className="w-24 h-24 mx-auto bg-slate-700/50 rounded-full flex items-center justify-center">
                    <Search className="text-slate-400" size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-300 mb-2">
                  {searchTerm ? 'No matching notes found' : 'No notes yet'}
                </h3>
                <p className="text-slate-400 mb-6">
                  {searchTerm 
                    ? `Try adjusting your search for "${searchTerm}"` 
                    : 'Create your first note to get started'
                  }
                </p>
                {!searchTerm && (
                  <a 
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                  >
                    <PencilLine size={20} />
                    Create Your First Note
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {filteredPastes.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-full text-slate-400 text-sm">
              <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
              {filteredPastes.length} notes available
            </div>
          </div>
        )}
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
};

export default Paste;