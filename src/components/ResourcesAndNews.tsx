import { useState } from 'react';
import { ArrowRight, Check, Download, FileText, X } from 'lucide-react';
import {
  buildDownloadableDocumentText,
  NEWS_ANNOUNCEMENTS,
  RESOURCE_DOCUMENTS,
} from '../data/saccoData';
import type { NewsAnnouncement, ResourceDocument } from '../types/sacco';
import { downloadTextDocument } from '../utils/finance';

export function ResourcesAndNews() {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [activeNotice, setActiveNotice] = useState<NewsAnnouncement | null>(null);

  const handleDownload = (doc: ResourceDocument) => {
    const content = buildDownloadableDocumentText(doc);
    downloadTextDocument(doc.filename, content);
    setDownloadedId(doc.id);
    setTimeout(() => {
      setDownloadedId((current) => (current === doc.id ? null : current));
    }, 2500);
  };

  return (
    <section id="resources" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: Resource Downloads (5 cols) */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-emerald-800 tracking-wide mb-2">
              03. Forms & Financials
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Resource Downloads
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Download official SACCO membership forms, guarantor schedules, and
              audited annual statements.
            </p>

            <div className="mt-6 divide-y divide-slate-200 bg-white border border-slate-200 rounded-xl overflow-hidden">
              {RESOURCE_DOCUMENTS.map((doc) => {
                const isDone = downloadedId === doc.id;
                return (
                  <div
                    key={doc.id}
                    className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{doc.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{doc.fileSize}</span>
                        <span aria-hidden="true">·</span>
                        <span>{doc.updatedAt}</span>
                      </div>
                      <h3 className="mt-1 font-display text-base font-bold text-slate-900 flex items-center gap-2">
                        <FileText
                          className="w-4 h-4 text-emerald-800 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{doc.title}</span>
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                        {doc.summary}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownload(doc)}
                      aria-label={`Download ${doc.title}`}
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                        isDone
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-white text-emerald-900 border-slate-300 hover:border-emerald-800 hover:bg-emerald-50'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: SACCO Announcements (7 cols) */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold text-emerald-800 tracking-wide mb-2">
              04. Member Notices
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Recent SACCO Announcements
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Governance updates, dividend declarations, and branch network notices for
              Uzima SACCO members.
            </p>

            <div className="mt-6 space-y-4">
              {NEWS_ANNOUNCEMENTS.map((item) => (
                <article
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 transition-colors hover:border-emerald-700/40"
                >
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-emerald-800">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={item.date}>{item.date}</time>
                  </div>

                  <h3 className="mt-1.5 font-display text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.excerpt}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveNotice(item)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 hover:underline underline-offset-4 cursor-pointer"
                  >
                    <span>Read Full Notice</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notice Reader Modal */}
      {activeNotice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notice-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-xl relative">
            <button
              type="button"
              onClick={() => setActiveNotice(null)}
              aria-label="Close announcement"
              className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 pr-10">
              <span className="font-medium text-emerald-800">
                {activeNotice.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeNotice.date}</span>
            </div>

            <h3
              id="notice-modal-title"
              className="mt-2 font-display text-xl sm:text-2xl font-bold text-slate-900 pr-8"
            >
              {activeNotice.title}
            </h3>

            <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
              {activeNotice.body.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveNotice(null)}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
