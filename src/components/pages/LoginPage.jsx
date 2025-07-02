import LoginForm from '../auth/LoginForm';
import HeroSection from '../HeroSection';

const LoginPage = () => {
  return (
    <div className=''>
          <HeroSection
          extraComponent={<LoginForm/>}
          background={'bg-gradient-to-br from-dubraText to-dubraPrimary pt-20'}
          customHeight='h-dvh'
          centerContent={true}
          textColor={'text-dubraPrimary'}
          />
    </div>
  );
};

export default LoginPage;