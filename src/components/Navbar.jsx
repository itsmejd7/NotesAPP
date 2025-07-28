import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-violet-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <NavLink 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent hover:from-violet-300 hover:to-purple-400 transition-all duration-300"
            >
              Notes
            </NavLink>
          </div>

          {/* Navigation */}
          <div className="flex items-center">
            <div className="flex items-baseline space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50 hover:shadow-md'
                  }`
                }
              >
                <span className="relative z-10">Home</span>
              </NavLink>

              <NavLink
                to="/pastes"
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50 hover:shadow-md'
                  }`
                }
              >
                <span className="relative z-10">Pastes</span>
              </NavLink>

            </div>
          </div>
        </div>
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </nav>
  )
}

export default Navbar