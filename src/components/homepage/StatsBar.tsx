'use client'

import type { Stat } from '@/lib/wordpress'
import { EditableField } from '@/components/cms/EditableField'
import { PAGE_IDS } from '@/lib/cmsFields'

interface Props { stats: Stat[] }

export function StatsBar({ stats }: Props) {

  return (
    <section className="bg-white border-t border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center md:border-r md:border-black/10 last:border-r-0"
            >
              <EditableField pageId={PAGE_IDS.homepage} fieldName={`stat_${index + 1}_value`} value={stat.value}>
                <div className="text-4xl md:text-5xl tracking-tight text-black/80">
                  {stat.value}
                </div>
              </EditableField>
              <EditableField pageId={PAGE_IDS.homepage} fieldName={`stat_${index + 1}_label`} value={stat.label}>
                <div className="text-xs tracking-wider text-black/40 mt-2">
                  {stat.label}
                </div>
              </EditableField>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
