import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { FormControl, InputLabel } from '@mui/material';
import { Select } from '@mui/material';

export type UserProps = {
  id: string;
  name: string;
  role: string;
  status: string;
  company: string;
  avatarUrl: string;
  isVerified: boolean;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  key: number;
  name: string;
  company: string;
  role: string;
  index: number;
  user: any;
  setUsers: any;
};

export function NewUserTableRow({
  row,
  selected,
  onSelectRow,
  key,
  name,
  company,
  role,
  index,
  user,
  setUsers,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedCompany, setEditedCompany] = useState(company);
  const [editedRole, setEditedRole] = useState(role);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDeleteUser = () => {
    setOpenPopover(null);
    const filteredData = user?.filter((_: any, id: number) => id !== index);
    setUsers(filteredData);
  };

  const handleEditUser = () => {
    setIsEditing(true);
    setOpenPopover(null);
  };

  const handleSave = () => {
    const updatedUsers = user.map((u: any, idx: number) =>
      idx === index ? { ...u, name: editedName, company: editedCompany, role: editedRole } : u
    );
    setUsers(updatedUsers);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={key}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />
            {isEditing ? (
              <TextField value={editedName} onChange={(e) => setEditedName(e.target.value)} />
            ) : (
              name
            )}
          </Box>
        </TableCell>

        <TableCell>
          {isEditing ? (
            <TextField value={editedCompany} onChange={(e) => setEditedCompany(e.target.value)} />
          ) : (
            company
          )}
        </TableCell>

        <TableCell>
          {isEditing ? (
           
           
                <Select
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="Project Manager">Project Manager</MenuItem>
                    <MenuItem value="Hr Manager">Hr Manager</MenuItem>
                    <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                    <MenuItem value="Full Stack Designer">Full Stack Designer</MenuItem>
                    <MenuItem value="UI Designer">UI Designer</MenuItem>
                    <MenuItem value="UI/UX Designer">UI/UX Designer</MenuItem>
                    <MenuItem value="Leader">Leader</MenuItem>
                    <MenuItem value="Front End Developer">Front End Developer</MenuItem>
                    <MenuItem value="Backend Developer">Backend Developer</MenuItem>
                </Select>
          ) : (
            role
          )}
        </TableCell>

        <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell>

        <TableCell align="right">
          {isEditing ? (
            <Box display="flex" gap={1}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </Box>
          ) : (
            <IconButton onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleEditUser}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
