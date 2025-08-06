import { UserInfo } from '@/types/userType';
import { Box, Button, Typography } from '@mui/material';

interface UserComponentProps extends UserInfo {
  onLogOut: () => void;
}

const UserComponent = ({
  firstName,
  lastName,
  onLogOut,
}: UserComponentProps) => {
  const hasName = firstName || lastName;

  const getInitials = () => {
    const firstInitial = firstName?.[0]?.toUpperCase() || '';
    const lastInitial = lastName?.[0]?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      px={4}
      py={2}
      bgcolor='white'
      boxShadow={1}
      borderRadius={2}
      mb={3}
      width={400}
    >
      {hasName ? (
        <>
          <Box display='flex' alignItems='center' gap={2}>
            <Box
              width={40}
              height={40}
              display='flex'
              alignItems='center'
              justifyContent='center'
              borderRadius='50%'
              bgcolor='primary.main'
              color='white'
              fontWeight='bold'
            >
              {getInitials()}
            </Box>
            <Typography variant='body1'>
              {firstName} {lastName}
            </Typography>
          </Box>
          <Button variant='outlined' color='error' onClick={onLogOut}>
            Вийти
          </Button>
        </>
      ) : (
        <Typography color='text.secondary' fontStyle='italic'>
          No user info
        </Typography>
      )}
    </Box>
  );
};

export default UserComponent;
