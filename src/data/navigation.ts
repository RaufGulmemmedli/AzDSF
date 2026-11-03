import type { Localized } from '@/types';

/**
 * Information architecture of the federation site.
 * Every mega-menu panel carries two link columns plus one data panel, so the
 * navigation itself answers the three questions people arrive with:
 * when is the next event, where do I stand, how do I join.
 */

export type MegaLink = { href: string; title: Localized; desc: Localized };
export type MegaColumn = { title: Localized; links: MegaLink[] };

export type MegaFeature =
  | {
      kind: 'cards';
      title: Localized;
      cards: { tag: Localized; title: Localized; detail: Localized }[];
      cta?: { href: string; label: Localized; style?: 'link' | 'button' };
    }
  | {
      kind: 'rows';
      title: Localized;
      rows: { key: string; label: Localized; value: string }[];
      footnote?: Localized;
      cta?: { href: string; label: Localized; style?: 'link' | 'button' };
    };

export type NavItem = {
  id: string;
  label: Localized;
  href?: string;
  columns?: MegaColumn[];
  feature?: MegaFeature;
};

export const utilityLinks: MegaLink[] = [
  {
    href: '/#uzvluk',
    title: { az: 'Üzv ol', en: 'Become a member' },
    desc: { az: '', en: '' }
  },
  {
    href: '/#resurslar',
    title: { az: 'Sənəd arxivi', en: 'Documents' },
    desc: { az: '', en: '' }
  },
  {
    href: '/#resurslar',
    title: { az: 'Tez-tez verilən suallar', en: 'FAQ' },
    desc: { az: '', en: '' }
  },
  {
    href: '/#elaqe',
    title: { az: 'Müraciət', en: 'Enquiries' },
    desc: { az: '', en: '' }
  }
];

export const navigation: NavItem[] = [
  {
    id: 'federation',
    label: { az: 'Federasiya', en: 'Federation' },
    columns: [
      {
        title: { az: 'Federasiya haqqında', en: 'About the federation' },
        links: [
          {
            href: '/#federasiya',
            title: { az: 'Haqqımızda', en: 'Who we are' },
            desc: {
              az: 'Məqsəd, struktur və fəaliyyət istiqamətləri',
              en: 'Purpose, structure and areas of work'
            }
          },
          {
            href: '/#federasiya',
            title: { az: 'Rəhbərlik', en: 'Executive board' },
            desc: { az: 'İcraiyyə komitəsi və katiblik', en: 'Executive committee and secretariat' }
          },
          {
            href: '/#resurslar',
            title: { az: 'Nizamnamə', en: 'Statutes' },
            desc: { az: 'Təsis sənədi və daxili qaydalar', en: 'Founding document and internal rules' }
          }
        ]
      },
      {
        title: { az: 'İdarəetmə', en: 'Governance' },
        links: [
          {
            href: '/#federasiya',
            title: { az: 'Komissiyalar', en: 'Commissions' },
            desc: {
              az: 'İdmançılar, hakimlər, texniki komissiya',
              en: 'Athletes, adjudicators, technical commission'
            }
          },
          {
            href: '/#resurslar',
            title: { az: 'Şəffaflıq', en: 'Transparency' },
            desc: { az: 'İllik hesabatlar, protokollar, büdcə', en: 'Annual reports, minutes, budget' }
          },
          {
            href: '/#resurslar',
            title: { az: 'Antidopinq', en: 'Anti-doping' },
            desc: {
              az: 'Qaydalar, test və idmançı maarifləndirilməsi',
              en: 'Rules, testing and athlete education'
            }
          }
        ]
      }
    ],
    feature: {
      kind: 'cards',
      title: { az: 'Qısaca', en: 'At a glance' },
      cards: [
        {
          tag: { az: 'Struktur', en: 'Structure' },
          title: {
            az: '7 nəfərlik icraiyyə komitəsi, dörd daimi komissiya',
            en: 'Executive committee of 7, four standing commissions'
          },
          detail: { az: 'İdarə heyətinin müddəti 2024–2028', en: 'Board term 2024–2028' }
        }
      ],
      cta: {
        href: '/#federasiya',
        label: { az: 'Federasiya haqqında oxu', en: 'Read about the federation' }
      }
    }
  },
  {
    id: 'membership',
    label: { az: 'Üzvlük', en: 'Membership' },
    columns: [
      {
        title: { az: 'Qoşul', en: 'Join' },
        links: [
          {
            href: '/#uzvluk',
            title: { az: 'Fərdi üzvlük', en: 'Individual membership' },
            desc: {
              az: 'İdmançı, məşqçi və hakim qeydiyyatı',
              en: 'Athlete, coach and adjudicator registration'
            }
          },
          {
            href: '/#uzvluk',
            title: { az: 'Klub üzvlüyü', en: 'Club membership' },
            desc: { az: 'Hüquqi şəxslər üçün akkreditasiya', en: 'Accreditation for legal entities' }
          },
          {
            href: '/#uzvluk',
            title: { az: 'Üzvlüyün yenilənməsi', en: 'Renewal' },
            desc: { az: 'Mövsüm başlamazdan əvvəl', en: 'Before the season opens' }
          }
        ]
      },
      {
        title: { az: 'Reyestr', en: 'Registry' },
        links: [
          {
            href: '/#klublar',
            title: { az: 'Üzv klublar', en: 'Accredited clubs' },
            desc: { az: '11 şəhərdə 42 akkreditə klub', en: '42 clubs across 11 cities' }
          },
          {
            href: '/#idmancilar',
            title: { az: 'Lisenziyalı cütlüklər', en: 'Licensed couples' },
            desc: {
              az: 'Yaş qrupları üzrə yarış lisenziyaları',
              en: 'Competition licences by age group'
            }
          },
          {
            href: '/#resurslar',
            title: { az: 'Haqq cədvəli', en: 'Fees' },
            desc: { az: 'İllik üzvlük və iştirak haqqı', en: 'Annual membership and entry fees' }
          }
        ]
      }
    ],
    feature: {
      kind: 'cards',
      title: { az: 'Mövsüm qeydiyyatı', en: 'Season registration' },
      cards: [
        {
          tag: { az: 'Açıqdır', en: 'Open' },
          title: { az: '2025/26 lisenziya müraciətləri', en: '2025/26 licence applications' },
          detail: { az: '01.12.2025 — 31.01.2026', en: '01.12.2025 — 31.01.2026' }
        }
      ],
      cta: { href: '/#uzvluk', label: { az: 'Müraciət et', en: 'Apply now' }, style: 'button' }
    }
  },
  {
    id: 'disciplines',
    label: { az: 'Rəqs növləri', en: 'Disciplines' },
    columns: [
      {
        title: { az: 'Bal rəqsi proqramları', en: 'Ballroom programmes' },
        links: [
          {
            href: '/#novler',
            title: { az: 'Standard', en: 'Standard' },
            desc: {
              az: 'Vals · Tanqo · Vyana valsı · Slowfox · Kviksteq',
              en: 'Waltz · Tango · Viennese Waltz · Slow Foxtrot · Quickstep'
            }
          },
          {
            href: '/#novler',
            title: { az: 'Latın Amerikası', en: 'Latin American' },
            desc: {
              az: 'Samba · Ça-ça-ça · Rumba · Paso doble · Cayv',
              en: 'Samba · Cha-cha-cha · Rumba · Paso Doble · Jive'
            }
          },
          {
            href: '/#novler',
            title: { az: 'Ten Dance', en: 'Ten Dance' },
            desc: { az: 'Hər iki proqram bir yarışda', en: 'Both programmes in one competition' }
          }
        ]
      },
      {
        title: { az: 'Digər növlər', en: 'Other disciplines' },
        links: [
          {
            href: '/#novler',
            title: { az: 'Breaking', en: 'Breaking' },
            desc: { az: 'Paris 2024-dən Olimpiya növü', en: 'Olympic discipline since Paris 2024' }
          },
          {
            href: '/#novler',
            title: { az: 'Para rəqs idmanı', en: 'Para DanceSport' },
            desc: { az: 'Təkərli kürsü rəqsi, kombi və duo', en: 'Wheelchair dance, combi and duo' }
          },
          {
            href: '/#novler',
            title: { az: 'Ansambl', en: 'Formation' },
            desc: { az: 'Səkkiz cütlükdən ibarət komandalar', en: 'Teams of eight couples' }
          }
        ]
      }
    ],
    feature: {
      kind: 'rows',
      title: { az: 'Yarış tempoları', en: 'Competition tempo' },
      rows: [
        { key: 'W', label: { az: 'Vals', en: 'Waltz' }, value: '28–30' },
        { key: 'V', label: { az: 'Vyana valsı', en: 'Viennese Waltz' }, value: '58–60' },
        { key: 'S', label: { az: 'Samba', en: 'Samba' }, value: '50–52' },
        { key: 'J', label: { az: 'Cayv', en: 'Jive' }, value: '42–44' }
      ],
      footnote: { az: 'takt / dəqiqə', en: 'bars per minute' }
    }
  },
  {
    id: 'competitions',
    label: { az: 'Yarışlar', en: 'Competitions' },
    columns: [
      {
        title: { az: 'Təqvim', en: 'Calendar' },
        links: [
          {
            href: '/competitions',
            title: { az: 'Təqvim 2026', en: '2026 calendar' },
            desc: {
              az: 'Milli, regional və beynəlxalq yarışlar',
              en: 'National, regional and international events'
            }
          },
          {
            href: '/competitions',
            title: { az: 'Qeydiyyat', en: 'Entry' },
            desc: { az: 'Onlayn müraciət və iştirak haqqı', en: 'Online entry and participation fee' }
          },
          {
            href: '/#resurslar',
            title: { az: 'Nizamnamələr', en: 'Competition rules' },
            desc: { az: 'Hər yarışın rəsmi sənədi', en: 'The official document for each event' }
          }
        ]
      },
      {
        title: { az: 'Formatlar', en: 'Formats' },
        links: [
          {
            href: '/#resurslar',
            title: { az: 'Yaş qrupları', en: 'Age groups' },
            desc: {
              az: 'Uşaqlar · Yeniyetmələr · Gənclər · Yetkinlər · Senior',
              en: 'Juvenile · Junior · Youth · Adult · Senior'
            }
          },
          {
            href: '/#resurslar',
            title: { az: 'Siniflər', en: 'Classes' },
            desc: { az: 'E-dən S-ə — təsnifat pilləkəni', en: 'From E to S — the classification ladder' }
          },
          {
            href: '/#resurslar',
            title: { az: 'Qiymətləndirmə', en: 'Adjudication' },
            desc: {
              az: 'Skating sistemi və mütləq qiymətləndirmə',
              en: 'Skating system and absolute judging'
            }
          }
        ]
      }
    ],
    feature: {
      kind: 'cards',
      title: { az: 'Növbəti yarışlar', en: 'Next events' },
      cards: [
        {
          tag: { az: '14.03.2026', en: '14.03.2026' },
          title: { az: 'Bakı Kuboku 2026', en: 'Baku Cup 2026' },
          detail: {
            az: 'İdman Sarayı, Bakı · Standard + Latın',
            en: 'Baku Sports Palace · Standard + Latin'
          }
        },
        {
          tag: { az: '25.04.2026', en: '25.04.2026' },
          title: { az: 'Azərbaycan Çempionatı', en: 'Azerbaijan Championship' },
          detail: { az: 'Bakı · Bütün yaş qrupları', en: 'Baku · All age groups' }
        }
      ],
      cta: { href: '/competitions', label: { az: 'Bütün təqvim', en: 'Full calendar' } }
    }
  },
  {
    id: 'results',
    label: { az: 'Nəticələr', en: 'Results' },
    columns: [
      {
        title: { az: 'Reytinq', en: 'Ranking' },
        links: [
          {
            href: '/#reytinq',
            title: { az: 'Milli reytinq', en: 'National ranking' },
            desc: {
              az: 'Lisenziyalı cütlüklərin cari sıralaması',
              en: 'Current standing of licensed couples'
            }
          },
          {
            href: '/#resurslar',
            title: { az: 'Xal qaydaları', en: 'Ranking rules' },
            desc: { az: 'Xalların verilməsi və müddəti', en: 'How points are awarded and expire' }
          }
        ]
      },
      {
        title: { az: 'Nəticələr', en: 'Results' },
        links: [
          {
            href: '/#reytinq',
            title: { az: 'Yarış nəticələri', en: 'Competition results' },
            desc: { az: 'Tur-tur protokollar', en: 'Round-by-round protocols' }
          },
          {
            href: '/#reytinq',
            title: { az: 'Arxiv', en: 'Archive' },
            desc: { az: '2019-cu ildən əvvəlki mövsümlər', en: 'Previous seasons from 2019 onward' }
          }
        ]
      }
    ],
    feature: {
      kind: 'rows',
      title: { az: 'İlk 3 · Yetkinlər Latın', en: 'Top 3 · Adults Latin' },
      rows: [
        {
          key: '1',
          label: { az: 'Rəşad Əliyev / Nigar Hüseynova', en: 'Rashad Aliyev / Nigar Huseynova' },
          value: '1 240'
        },
        {
          key: '2',
          label: { az: 'Tural Məmmədov / Aysel Quliyeva', en: 'Tural Mammadov / Aysel Guliyeva' },
          value: '1 185'
        },
        {
          key: '3',
          label: { az: 'Kamran Səfərov / Lalə İsmayılova', en: 'Kamran Safarov / Lala Ismayilova' },
          value: '1 072'
        }
      ],
      cta: { href: '/#reytinq', label: { az: 'Tam reytinq', en: 'Full ranking' } }
    }
  },
  {
    id: 'athletes',
    label: { az: 'İdmançılar', en: 'Athletes' },
    columns: [
      {
        title: { az: 'İdmançılar', en: 'Athletes' },
        links: [
          {
            href: '/#idmancilar',
            title: { az: 'Milli komanda', en: 'National team' },
            desc: {
              az: '2026 mövsümü üçün seçilmiş cütlüklər',
              en: 'Couples selected for the 2026 season'
            }
          },
          {
            href: '/#idmancilar',
            title: { az: 'Cütlüklər reyestri', en: 'Couples registry' },
            desc: { az: 'Lisenziya nömrəsi, sinif və klub', en: 'Licence number, class and club' }
          }
        ]
      },
      {
        title: { az: 'Rəsmi şəxslər', en: 'Officials' },
        links: [
          {
            href: '/#idmancilar',
            title: { az: 'Məşqçilər', en: 'Coaches' },
            desc: { az: 'Sertifikat səviyyələri və seminarlar', en: 'Certification levels and seminars' }
          },
          {
            href: '/#idmancilar',
            title: { az: 'Hakimlər korpusu', en: 'Adjudicators' },
            desc: { az: 'Milli və beynəlxalq lisenziyalar', en: 'National and international licences' }
          }
        ]
      }
    ],
    feature: {
      kind: 'cards',
      title: { az: 'Seçim', en: 'Selection' },
      cards: [
        {
          tag: { az: 'Milli komanda', en: 'National team' },
          title: {
            az: 'Milli çempionatdan sonra seçim',
            en: 'Selection after the National Championship'
          },
          detail: { az: '25.04.2026 — 30.04.2026', en: '25.04.2026 — 30.04.2026' }
        }
      ],
      cta: { href: '/#idmancilar', label: { az: 'Heyətə bax', en: 'See the squad' } }
    }
  },
  {
    id: 'media',
    label: { az: 'Media', en: 'Media' },
    columns: [
      {
        title: { az: 'Xəbər lenti', en: 'Newsroom' },
        links: [
          {
            href: '/news',
            title: { az: 'Xəbərlər', en: 'News' },
            desc: { az: 'Elanlar, qərarlar və hesabatlar', en: 'Announcements, decisions and reports' }
          },
          {
            href: '/#qalereya',
            title: { az: 'Foto qalereya', en: 'Photo gallery' },
            desc: { az: 'Yarış və məşq fotoları', en: 'Competition and training photography' }
          }
        ]
      },
      {
        title: { az: 'Media üçün', en: 'For media' },
        links: [
          {
            href: '/#qalereya',
            title: { az: 'Video', en: 'Video' },
            desc: { az: 'Finallar, xülasələr və müsahibələr', en: 'Finals, recaps and interviews' }
          },
          {
            href: '/#elaqe',
            title: { az: 'Mətbuat paketi', en: 'Press kit' },
            desc: { az: 'Loqo, brend qaydaları və akkreditasiya', en: 'Logo, brand rules and accreditation' }
          }
        ]
      }
    ],
    feature: {
      kind: 'cards',
      title: { az: 'Ən son', en: 'Latest' },
      cards: [
        {
          tag: { az: '12.02.2026', en: '12.02.2026' },
          title: {
            az: '2026 yarış təqvimi dərc olundu',
            en: 'The 2026 competition calendar is published'
          },
          detail: { az: '6 şəhərdə 18 milli yarış', en: '18 national events across 6 cities' }
        }
      ],
      cta: { href: '/news', label: { az: 'Bütün xəbərlər', en: 'All news' } }
    }
  },
  {
    id: 'contact',
    label: { az: 'Əlaqə', en: 'Contact' },
    href: '/#elaqe'
  }
];
