export default function getStatus(status, isClosed) {
  let stt;
  let statusColor;

  if (status === 0 && isClosed === true) {
    stt = 'Rejected';
    statusColor = '#DB2C66';
  } else if (status === 0 && isClosed === false) {
    stt = '• New';
    statusColor = '#DB8B00';
  } else if (status === 1 && isClosed === false) {
    stt = 'To-do';
    statusColor = '#006FD6';
  } else if (status === 2 && isClosed === false) {
    stt = 'On-going';
    statusColor = '#274BDB';
  } else if ([3, 4].includes(status) && isClosed === false) {
    stt = '• Reviewing';
    if (status === 3) stt += ' | Done';
    else stt += ' | Blocked';
    statusColor = '#DB8B00';
  } else if (status === 3 && isClosed === true) {
    stt = 'Done';
    statusColor = '#00B383';
  } else if (status === 4 && isClosed === true) {
    stt = 'Blocked';
  } else if (status === 5) {
    stt = 'Overdue';
    statusColor = '#DB2C66';
  } else if ([1, 2].includes(status) && isClosed === true) {
    stt = 'Closed';
    statusColor = '#2E3A59';
  }
  return [stt, statusColor];
}
