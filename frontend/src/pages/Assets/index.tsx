import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, AlertTriangle, Package, 
  DollarSign, UserCheck, Trash2, ShieldCheck, 
  User, ChevronRight, Activity, ClipboardList,
  Wrench, History, UserPlus, Edit3, Settings,
  ArrowRight, Landmark, HardHat
} from 'lucide-react';

// --- Types ---
type AssetCategory = 'Musical' | 'IT' | 'Furniture' | 'Catering';
type AssetCondition = 'Excellent' | 'Good' | 'Fair' | 'Poor';
type UserRole = 'ADMIN' | 'MEMBER';

interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  category: AssetCategory;
  condition: AssetCondition;
  status: 'Allocated' | 'Available' | 'Maintenance';
  value: number;
  isOverdue?: boolean;
  custodian?: string;
  lastService?: string;
}

const ChurchAssetSystem = () => {
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [view, setView] = useState<'REGISTRY' | 'DETAIL'>('REGISTRY');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: 'Yamaha Montage 8', serialNumber: 'YAM-9920', category: 'Musical', condition: 'Excellent', status: 'Allocated', value: 4500, isOverdue: true, custodian: 'Worship Team', lastService: '2026-02-10' },
    { id: '2', name: 'MacBook Pro M3', serialNumber: 'AAPL-5521', category: 'IT', condition: 'Good', status: 'Available', value: 2400, lastService: '2025-12-15' },
    { id: '3', name: 'Stacking Chairs (x50)', serialNumber: 'FUR-001', category: 'Furniture', condition: 'Fair', status: 'Allocated', value: 1200, custodian: 'Youth Hall' },
    { id: '4', name: 'Soundcraft Mixer', serialNumber: 'SC-441', category: 'Musical', condition: 'Poor', status: 'Maintenance', value: 3100, lastService: '2026-01-05' },
  ]);

  const stats = useMemo(() => {
    const counts = { Excellent: 0, Good: 0, Fair: 0, Poor: 0 };
    assets.forEach(a => counts[a.condition]++);
    return {
      total: assets.length,
      value: assets.reduce((acc, curr) => acc + curr.value, 0),
      allocated: assets.filter(a => a.status === 'Allocated').length,
      overdue: assets.filter(a => a.isOverdue).length,
      conditionCounts: counts,
      disposal: assets.filter(a => a.condition === 'Poor')
    };
  }, [assets]);

  const selectedAsset = assets.find(a => a.id === selectedAssetId);

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* ROLE TOGGLE (Demo Floating UI) */}
      <div className="fixed bottom-8 right-8 flex bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-1.5 border border-white/50 z-50">
        <button onClick={() => setRole('MEMBER')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${role === 'MEMBER' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'}`}>MEMBER</button>
        <button onClick={() => setRole('ADMIN')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${role === 'ADMIN' ? 'bg-indigo-900 text-white shadow-lg shadow-slate-300' : 'text-slate-500 hover:bg-slate-100'}`}>ADMIN</button>
      </div>

      {/* TOP NAVIGATION BAR */}
      <nav className="bg-indigo-950 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg italic font-black text-xl">CU</div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">CUCU ASSETS</h1>
            <p className="text-[10px] text-indigo-300 uppercase tracking-[0.2em] font-bold">Stewardship Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <span className="text-indigo-300 flex items-center gap-2"><Landmark size={16}/> Internal Registry</span>
          <div className="h-8 w-[1px] bg-indigo-800" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold">{role === 'ADMIN' ? 'John IT' : 'Guest Member'}</p>
              <p className="text-[10px] text-indigo-400">{role}</p>
            </div>
            <div className="h-10 w-10 bg-indigo-500 rounded-full border-2 border-indigo-400 flex items-center justify-center font-bold">J</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
        
        {view === 'REGISTRY' ? (
          <>
            {/* ALERT BOX */}
            {stats.overdue > 0 && (
              <div className="bg-white border-l-[6px] border-rose-500 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="bg-rose-100 p-3 rounded-2xl text-rose-600">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">Action Required: Overdue Items</h3>
                    <p className="text-slate-500 text-sm">There are currently <span className="font-bold text-rose-600">{stats.overdue} assets</span> past their return date.</p>
                  </div>
                </div>
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200">View All Overdue</button>
              </div>
            )}

            {/* PHASE 3 SUMMARY & STATS */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">Inventory Health</h3>
                    <p className="text-slate-400 text-sm font-medium">Overall condition breakdown of physical assets</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Estimated Registry Value</p>
                        <p className="text-2xl font-black text-indigo-600">${stats.value.toLocaleString()}</p>
                     </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="h-6 w-full flex rounded-2xl overflow-hidden bg-slate-50 ring-4 ring-slate-50">
                    <div style={{ width: `${(stats.conditionCounts.Excellent/stats.total)*100}%` }} className="bg-emerald-400 hover:brightness-110 transition-all cursor-help" />
                    <div style={{ width: `${(stats.conditionCounts.Good/stats.total)*100}%` }} className="bg-indigo-400 hover:brightness-110 transition-all cursor-help" />
                    <div style={{ width: `${(stats.conditionCounts.Fair/stats.total)*100}%` }} className="bg-amber-400 hover:brightness-110 transition-all cursor-help" />
                    <div style={{ width: `${(stats.conditionCounts.Poor/stats.total)*100}%` }} className="bg-rose-400 hover:brightness-110 transition-all cursor-help" />
                  </div>
                  <div className="flex justify-between px-2">
                    <LegendItem label="Excellent" color="bg-emerald-400" count={stats.conditionCounts.Excellent} />
                    <LegendItem label="Good" color="bg-indigo-400" count={stats.conditionCounts.Good} />
                    <LegendItem label="Fair" color="bg-amber-400" count={stats.conditionCounts.Fair} />
                    <LegendItem label="Poor" color="bg-rose-400" count={stats.conditionCounts.Poor} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 grid grid-cols-1 gap-6">
                <MiniStat icon={<UserCheck className="text-emerald-600"/>} label="Allocated" value={stats.allocated} bgColor="bg-emerald-50" />
                <div className="bg-indigo-900 rounded-[32px] p-8 text-white flex flex-col justify-between shadow-xl shadow-indigo-200">
                  <Package className="text-indigo-300 mb-4" size={28}/>
                  <div>
                    <p className="text-4xl font-black">{stats.total}</p>
                    <p className="text-indigo-300 text-sm font-medium">Total Registered Assets</p>
                  </div>
                </div>
              </div>
            </section>

            {/* TABLE SECTION */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight">Physical Assets</h2>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Search by name or serial..." className="w-full md:w-80 pl-12 pr-4 py-3 bg-slate-50 rounded-2xl text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
                  </div>
                  {role === 'ADMIN' && (
                    <button className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                      <Plus size={24} />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-[0.15em] border-b border-slate-50">
                    <tr>
                      <th className="px-10 py-5">Asset Information</th>
                      <th className="px-10 py-5">Category</th>
                      <th className="px-10 py-5">Condition</th>
                      <th className="px-10 py-5">Status</th>
                      <th className="px-10 py-5 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {assets.map(asset => (
                      <tr key={asset.id} className="group hover:bg-slate-50 transition-all cursor-pointer" onClick={() => { setSelectedAssetId(asset.id); setView('DETAIL'); }}>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-md transition-all">
                               {asset.category === 'Musical' ? <Activity size={20}/> : <Settings size={20}/>}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-lg leading-tight">{asset.name}</p>
                              <p className="text-xs font-mono text-slate-400 mt-1">{asset.serialNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="text-sm font-semibold text-slate-500">{asset.category}</span>
                        </td>
                        <td className="px-10 py-6">
                          <ConditionChip condition={asset.condition} />
                        </td>
                        <td className="px-10 py-6">
                           {asset.isOverdue ? (
                             <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase ring-1 ring-rose-200">
                               <AlertTriangle size={12}/> Overdue
                             </span>
                           ) : (
                             <div className="flex items-center gap-2">
                               <div className={`h-2 w-2 rounded-full ${asset.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                               <span className="text-sm font-bold text-slate-600">{asset.status}</span>
                             </div>
                           )}
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all text-slate-300">
                            <ArrowRight size={20} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* ASSET DETAIL PAGE */
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-4 mb-8">
               <button onClick={() => setView('REGISTRY')} className="h-12 w-12 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all">
                  <ChevronRight size={24} className="rotate-180" />
               </button>
               <div>
                  <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-none">Asset Dossier</h2>
                  <h3 className="text-2xl font-black tracking-tight">{selectedAsset?.name}</h3>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-10 relative">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Product Details</label>
                      <h4 className="text-3xl font-black mt-2">{selectedAsset?.name}</h4>
                      <p className="text-slate-400 font-mono text-sm mt-1">{selectedAsset?.serialNumber}</p>
                    </div>
                    <div className="flex gap-3">
                       <ConditionChip condition={selectedAsset!.condition} />
                       <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase">{selectedAsset?.category}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Custodian</label>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="h-12 w-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
                        <User size={24}/>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg leading-tight">{selectedAsset?.custodian || 'Unallocated'}</p>
                        <p className="text-xs text-indigo-500 font-bold uppercase mt-1">Primary Issued</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                  <div className="flex bg-slate-50/50 p-3">
                    <button className="flex-1 py-4 px-6 rounded-[24px] bg-white shadow-md text-sm font-bold text-indigo-600 flex items-center justify-center gap-3 transition-all">
                      <History size={18}/> Maintenance Logs
                    </button>
                    <button className="flex-1 py-4 px-6 text-sm font-bold text-slate-400 flex items-center justify-center gap-3 hover:text-slate-600 transition-all">
                      <ClipboardList size={18}/> Allocation History
                    </button>
                  </div>
                  <div className="p-10">
                    <div className="flex justify-between items-center mb-8">
                      <h4 className="font-black text-sm uppercase tracking-widest text-slate-800">Chronological Repair History</h4>
                      <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all">+ Log Service</button>
                    </div>
                    <div className="space-y-4">
                      <ServiceCard date="01 Mar 2026" title="General Cleaning & Recalibration" tech="CUCU IT Subcommittee" />
                      <ServiceCard date="15 Dec 2025" title="Hardware Diagnostic" tech="Internal Service" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-indigo-950 p-10 rounded-[40px] text-white shadow-2xl shadow-indigo-200">
                  <h3 className="font-black text-xs uppercase tracking-widest mb-8 text-indigo-400">Control Actions</h3>
                  <div className="space-y-4">
                    <DetailAction icon={<Wrench size={20}/>} label="Log Maintenance" primary />
                    <DetailAction icon={<UserPlus size={20}/>} label="Issue to Ministry" />
                    
                    {role === 'ADMIN' && (
                      <div className="pt-8 mt-8 border-t border-indigo-900 space-y-4">
                        <DetailAction icon={<Edit3 size={20}/>} label="Edit Asset Specs" ghost />
                        <DetailAction icon={<Trash2 size={20}/>} label="Retire from Registry" danger />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Valuation</p>
                      <p className="text-3xl font-black text-slate-900 mt-1">${selectedAsset?.value.toLocaleString()}</p>
                   </div>
                   <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                      <DollarSign size={28}/>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Sub-components with improved styling ---

const LegendItem = ({ label, color, count }: any) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 mb-1">
      <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <p className="font-black text-slate-800 text-lg">{count}</p>
  </div>
);

const ConditionChip = ({ condition }: { condition: AssetCondition }) => {
  const styles: Record<AssetCondition, string> = {
    Excellent: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Good: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    Fair: 'bg-amber-50 text-amber-700 border-amber-100',
    Poor: 'bg-rose-50 text-rose-700 border-rose-100'
  };
  return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 shadow-sm ${styles[condition]}`}>{condition}</span>;
};

const MiniStat = ({ icon, label, value, bgColor }: any) => (
  <div className={`${bgColor} p-8 rounded-[32px] border border-white flex items-center justify-between`}>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-slate-800">{value}</p>
    </div>
    <div className="h-12 w-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">{icon}</div>
  </div>
);

const DetailAction = ({ icon, label, primary, danger, ghost }: any) => (
  <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm
    ${primary ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-400/30 hover:shadow-xl' : 
      danger ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-600 hover:text-white' :
      ghost ? 'bg-indigo-900 text-indigo-300 hover:bg-indigo-800' :
      'bg-indigo-800 text-white hover:bg-indigo-700'}`}>
    {icon} {label}
  </button>
);

const ServiceCard = ({ date, title, tech }: any) => (
  <div className="flex gap-6 p-6 rounded-[24px] bg-slate-50 hover:bg-slate-100 transition-all border border-slate-100 group">
    <div className="text-center min-w-[60px]">
       <p className="text-xs font-black text-indigo-600 uppercase tracking-tighter">Service</p>
       <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">2026</p>
    </div>
    <div className="h-10 w-[1px] bg-slate-200 mt-1" />
    <div>
      <p className="font-bold text-slate-800">{title}</p>
      <div className="flex items-center gap-2 mt-1">
        <HardHat size={12} className="text-slate-400"/>
        <p className="text-xs text-slate-500 font-medium">{tech} • {date}</p>
      </div>
    </div>
  </div>
);

export default ChurchAssetSystem;