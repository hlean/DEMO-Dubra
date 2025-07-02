import React from 'react'
import HeroSection from '../HeroSection';
import ProfileCard from '../ProfileCard';
import HistoryCard from '../HistoryCard';

const ProfilePage = () => {
  return (
    <div className='h-full'>
        <HeroSection
          extraComponent={<div className='flex w-full flex-col items-center justify-center gap-2'><ProfileCard/> <HistoryCard/></div>}
          background={'bg-gradient-to-br from-dubraText to-dubraPrimary'}
          customHeight=' h-full '
          centerContent={false}
          textColor={'text-dubraPrimary'}/>
    </div>
  )
}

export default ProfilePage