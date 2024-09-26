import { Box, Avatar, TableRow, TableCell } from '@mui/material';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

interface AddUserProps {
  name: string;
  company: string;
  role: string;
  isVerified: boolean;
  status: string;
  avatarUrl: string;
}

export function AddUserRow({ user }: { user: AddUserProps }) {
  return (
    <TableRow >
      <TableCell>
        <Box gap={2} display="flex" alignItems="center">
          <Avatar alt={user.name} src={user.avatarUrl} />
          {user.name}
        </Box>
      </TableCell>

      <TableCell>{user.company}</TableCell>
      <TableCell>{user.role}</TableCell>

      <TableCell align="center">
        {user.isVerified ? (
          <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
        ) : (
          '-'
        )}
      </TableCell>

      <TableCell>
        <Label color={(user.status === 'banned' && 'error') || 'success'}>{user.status}</Label>
      </TableCell>
    </TableRow>
  );
}
