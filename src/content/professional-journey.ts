export interface ProfessionalMilestone {
    id: string;
    date: string;
    role: string;
    company: string;
    description: string;
    achievement: string;
}

export const professionalMilestones: ProfessionalMilestone[] = [
    {
        id: '1',
        date: '2025-Present',
        role: 'Cross-Platform SaaS Architect',
        company: 'Nutritionist Platform (Side Project)',
        description: 'Architecting multi-tenant SaaS platform with Next.js App Router and React Native (Expo Router). Implementing tRPC with Prisma ORM for type-safe API communication and real-time sync with WebSocket.',
        achievement: 'Achieved 60% code sharing between web and mobile platforms. Built offline-first architecture with SQLite and conflict resolution.'
    },
    {
        id: '2',
        date: '2020-Present',
        role: 'Technical Manager & Full-Stack Architect',
        company: 'CCPTools Ecosystem',
        description: 'Leading cross-functional team of 5 developers, architecting microservices ecosystem serving 1,000+ weekly active users. Managing 6-project portfolio including React Native apps, Node.js APIs, and Next.js applications.',
        achievement: 'Implemented 10,000+ automated tests achieving 95% code coverage. Reduced development time by 40% through RJSF dynamic forms and improved team velocity.'
    },
    {
        id: '3',
        date: '2018-2020',
        role: 'Freelance Full-Stack Developer',
        company: 'Self-Employed',
        description: 'Migrated 16+ legacy applications from jQuery/ASP.NET to React/Node.js. Rapidly mastered new frameworks including Angular and React for immediate client value.',
        achievement: '100% on-time delivery with 100% client satisfaction rate on Freelancer.com. Mastered Angular in 2 weeks and React in 1 week.'
    },
    {
        id: '4',
        date: '2015-2018',
        role: 'Senior Full-Stack Developer & Solutions Architect',
        company: 'Development Company',
        description: 'Transitioned to modern web technologies, building Telegram bot serving 400+ admins and 500,000+ users. Developed offline-first ERP systems and pioneered real-time processing solutions.',
        achievement: 'Scaled Telegram bot to 1,000 messages/second with 99% uptime. Reduced spam incidents by 95% through intelligent filtering algorithms.'
    },
    {
        id: '5',
        date: '2007-2015',
        role: 'Founder & CEO',
        company: 'Development Company',
        description: 'Founded and ran development company. Built 30+ ASP.NET websites, healthcare management systems, and custom ERP solutions while managing all business operations.',
        achievement: 'Won 2014 Best Entrepreneur Award for healthcare digitization. Served 500+ clinics with 2000+ users.'
    },
    {
        id: '6',
        date: '2005-2007',
        role: 'Junior Software Developer',
        company: 'Cotton Manufacturing Factory (Parjan)',
        description: 'Started programming career at age 16, developing business-critical applications with VB6 and MS Access including weighbridge system, timesheet management, and vehicle monitoring.',
        achievement: 'Built weighbridge system that operated successfully for 10+ years. Developed 4 Windows applications that digitized entire factory operations.'
    },
    {
        id: '7',
        date: '2003-2006',
        role: 'Self-Taught Developer & GIS Specialist',
        company: 'Independent Projects',
        description: 'Self-taught VB6 and GIS development at age 16-19. Developed GIS applications with MapObject2 and ArcGIS, creating first form generator for dynamic GIS data entry.',
        achievement: 'Completed 3 national GIS mapping projects. Pioneered dynamic form generation for complex geographical data management.'
    }
];