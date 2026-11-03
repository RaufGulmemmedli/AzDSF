import Hero from '@/components/home/Hero';
import NextCompetitionSection from '@/components/home/NextCompetitionSection';
import QuickTiles from '@/components/home/QuickTiles';
import NewsSection from '@/components/home/NewsSection';
import AboutSection from '@/components/home/AboutSection';
import StatsBand from '@/components/home/StatsBand';
import DisciplinesSection from '@/components/home/DisciplinesSection';
import CompetitionsSection from '@/components/home/CompetitionsSection';
import RankingSection from '@/components/home/RankingSection';
import AthletesSection from '@/components/home/AthletesSection';
import MembershipSection from '@/components/home/MembershipSection';
import ClubsSection from '@/components/home/ClubsSection';
import GallerySection from '@/components/home/GallerySection';
import PartnersSection from '@/components/home/PartnersSection';
import ContactSection from '@/components/home/ContactSection';
import { setRequestLocale } from 'next-intl/server';
import { getNextCompetition } from '@/lib/schedule';

/**
 * The hero picks "the next competition" from the clock, so the static page is
 * re-generated hourly instead of freezing whatever was next at build time.
 */
export const revalidate = 3600;

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  // Chosen on the server so the countdown never disagrees about "now".
  const next = getNextCompetition();

  return (
    <>
      <Hero />
      <NextCompetitionSection next={next} />
      <QuickTiles />
      <NewsSection />
      <AboutSection />
      <StatsBand />
      <DisciplinesSection />
      <CompetitionsSection />
      <RankingSection />
      <AthletesSection />
      <MembershipSection />
      <ClubsSection />
      <GallerySection />
      <PartnersSection />
      <ContactSection />
    </>
  );
}
