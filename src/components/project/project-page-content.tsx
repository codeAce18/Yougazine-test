'use client';

import Container from '@components/ui/container';
import {useState} from "react";
import { ProjectGrid } from '@components/project/project-grid';

export default function ProjectPageContent({ lang }: { lang: string }) {
    const [viewAs, setViewAs] = useState(Boolean(true));
  return (
    <Container>
      {/* @ts-ignore */}
      <ProjectGrid lang={lang} viewAs={viewAs} />
    </Container>
  );
}
