import RegisterForm from '../auth/RegisterForm';
import HeroSection from '../HeroSection';

const RegisterPage = () => {
  return (
        <div className=''>
          <HeroSection
          extraComponent={<RegisterForm/>}
          background={'bg-gradient-to-br from-dubraText to-dubraPrimary pt-25'}
          customHeight='h-dvh'
          centerContent={true}
          />
        </div>
        
  );
};

export default RegisterPage;