/**
 * Admin JavaScript - HSBC Banking App
 * Handles admin-specific functionality
 */

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initAdminTabs();
    initUserSearch();
    initTransactionFilters();
});

// ============================================
// ADMIN TABS
// ============================================
function initAdminTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const target = this.dataset.target;

            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            contents.forEach(c => c.classList.remove('active'));
            const content = document.getElementById(target);
            if (content) {
                content.classList.add('active');
            }
        });
    });
}

// ============================================
// USER SEARCH
// ============================================
function initUserSearch() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const tableRows = document.querySelectorAll('#usersTable tbody tr');

    function filterUsers() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const status = statusFilter ? statusFilter.value : 'all';

        tableRows.forEach(row => {
            if (row.classList.contains('empty-state')) return;

            const name = row.dataset.name || '';
            const email = row.dataset.email || '';
            const rowStatus = row.dataset.status || 'active';

            let show = true;

            if (searchTerm && !name.includes(searchTerm) && !email.includes(searchTerm)) {
                show = false;
            }

            if (status !== 'all' && rowStatus !== status) {
                show = false;
            }

            row.style.display = show ? '' : 'none';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', filterUsers);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterUsers);
    }
}

// ============================================
// TRANSACTION FILTERS
// ============================================
function initTransactionFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const transactionRows = document.querySelectorAll('#transactionsTable tbody tr');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const status = this.dataset.status;

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            transactionRows.forEach(row => {
                if (row.classList.contains('empty-state')) return;

                const rowStatus = row.dataset.status || 'pending';
                if (status === 'all' || rowStatus === status) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// TOP UP USER
// ============================================
function openTopupModal(userId, username) {
    const modal = document.getElementById('topupModal');
    if (!modal) return;

    document.getElementById('topupUserId').value = userId;
    document.getElementById('topupUsername').textContent = username;
    document.getElementById('topupAmount').value = '';
    document.getElementById('topupMessage').innerHTML = '';

    modal.classList.add('active');
}

function closeTopupModal() {
    const modal = document.getElementById('topupModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

async function submitTopup() {
    const userId = document.getElementById('topupUserId').value;
    const amount = document.getElementById('topupAmount').value;
    const description = document.getElementById('topupDescription').value;
    const messageDiv = document.getElementById('topupMessage');

    if (!amount || parseFloat(amount) <= 0) {
        messageDiv.innerHTML = '<div class="alert alert-danger">Please enter a valid amount</div>';
        return;
    }

    try {
        const response = await fetch('/api/admin/topup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: parseInt(userId),
                amount: parseFloat(amount),
                description: description || 'Admin top up'
            })
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.innerHTML = `<div class="alert alert-success">✅ ${data.message}</div>`;
            showToast(`✅ ${data.message}`, 'success');
            setTimeout(() => {
                closeTopupModal();
                location.reload();
            }, 1500);
        } else {
            messageDiv.innerHTML = `<div class="alert alert-danger">❌ ${data.error}</div>`;
        }
    } catch (error) {
        messageDiv.innerHTML = '<div class="alert alert-danger">❌ Network error. Please try again.</div>';
    }
}

// ============================================
// APPROVE/REJECT TRANSACTION
// ============================================
async function approveTransaction(transactionId) {
    if (!confirm('Are you sure you want to approve this transaction?')) return;

    try {
        const response = await fetch(`/api/admin/transaction/${transactionId}/approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.ok) {
            showToast(`✅ ${data.message}`, 'success');
            const row = document.getElementById(`transaction-row-${transactionId}`);
            if (row) {
                row.style.opacity = '0.5';
                setTimeout(() => {
                    row.remove();
                }, 500);
            }
        } else {
            showToast(`❌ ${data.error}`, 'error');
        }
    } catch (error) {
        showToast('❌ Network error. Please try again.', 'error');
    }
}

async function rejectTransaction(transactionId) {
    if (!confirm('Are you sure you want to reject this transaction?')) return;

    try {
        const response = await fetch(`/api/admin/transaction/${transactionId}/reject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.ok) {
            showToast(`✅ ${data.message}`, 'info');
            const row = document.getElementById(`transaction-row-${transactionId}`);
            if (row) {
                row.style.opacity = '0.5';
                setTimeout(() => {
                    row.remove();
                }, 500);
            }
        } else {
            showToast(`❌ ${data.error}`, 'error');
        }
    } catch (error) {
        showToast('❌ Network error. Please try again.', 'error');
    }
}

// ============================================
// FREEZE/UNFREEZE USER
// ============================================
async function freezeUser(userId, username) {
    if (!confirm(`Are you sure you want to freeze ${username}'s account?`)) return;

    try {
        const response = await fetch(`/api/admin/freeze-user/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.ok) {
            showToast(`✅ ${data.message}`, 'success');
            setTimeout(() => location.reload(), 1000);
        } else {
            showToast(`❌ ${data.error}`, 'error');
        }
    } catch (error) {
        showToast('❌ Network error. Please try again.', 'error');
    }
}

async function unfreezeUser(userId, username) {
    if (!confirm(`Are you sure you want to unfreeze ${username}'s account?`)) return;

    try {
        const response = await fetch(`/api/admin/unfreeze-user/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.ok) {
            showToast(`✅ ${data.message}`, 'success');
            setTimeout(() => location.reload(), 1000);
        } else {
            showToast(`❌ ${data.error}`, 'error');
        }
    } catch (error) {
        showToast('❌ Network error. Please try again.', 'error');
    }
}

// ============================================
// EXPORT FUNCTIONS
// ============================================
window.openTopupModal = openTopupModal;
window.closeTopupModal = closeTopupModal;
window.submitTopup = submitTopup;
window.approveTransaction = approveTransaction;
window.rejectTransaction = rejectTransaction;
window.freezeUser = freezeUser;
window.unfreezeUser = unfreezeUser;