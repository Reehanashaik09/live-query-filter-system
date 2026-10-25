import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Initial items list
  const [items, setItems] = useState([
    { id: 1, name: 'Data Analysis Report', category: 'Analytics', status: 'Active' },
    { id: 2, name: 'E-Commerce Conversion Metrics', category: 'Sales', status: 'Pending' },
    { id: 3, name: 'Logistics Optimization Script', category: 'Engineering', status: 'Active' },
    { id: 4, name: 'Customer Segment Clusters', category: 'Analytics', status: 'Archived' },
  ]);

  // Form state for adding new records
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Analytics');
  const [newStatus, setNewStatus] = useState('Active');
  const [showForm, setShowForm] = useState(false);

  // Handle adding a new item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem = {
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
      name: newName.trim(),
      category: newCategory,
      status: newStatus,
    };

    setItems([newItem, ...items]);
    setNewName('');
    setShowForm(false);
  };

  // Handle deleting an item
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Filter items based on search query and status dropdown
  const filteredItems = items.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) ||
                         item.category.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div style={{ padding: '40px', maxWidth: '850px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ color: '#1e293b', marginBottom: '6px', fontSize: '26px' }}>Live Query Filter System</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Search, filter, add, and manage live system records.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? '#e2e8f0' : '#2563eb',
            color: showForm ? '#1e293b' : '#ffffff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          {showForm ? 'Cancel' : '+ Add New Record'}
        </button>
      </header>

      {/* Add Record Form Panel */}
      {showForm && (
        <form onSubmit={handleAddItem} style={{ background: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#1e293b' }}>Create New System Record</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Record Name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#fff' }}
            >
              <option value="Analytics">Analytics</option>
              <option value="Sales">Sales</option>
              <option value="Engineering">Engineering</option>
              <option value="Operations">Operations</option>
            </select>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#fff' }}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Archived">Archived</option>
            </select>
            <button
              type="submit"
              style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' }}>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderLeft: '4px solid #2563eb' }}>
          <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Total Records</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginTop: '4px' }}>{items.length}</div>
        </div>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderLeft: '4px solid #16a34a' }}>
          <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Active Items</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>
            {items.filter(i => i.status === 'Active').length}
          </div>
        </div>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderLeft: '4px solid #ca8a04' }}>
          <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Pending / Other</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#ca8a04', marginTop: '4px' }}>
            {items.filter(i => i.status !== 'Active').length}
          </div>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: '1',
            minWidth: '240px',
            padding: '12px 16px',
            fontSize: '15px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            outline: 'none',
            background: '#ffffff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '12px 16px',
            fontSize: '15px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Table Section */}
      <div style={{ background: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '14px 18px' }}>ID</th>
              <th style={{ padding: '14px 18px' }}>Record Name</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px', color: '#64748b', fontWeight: '500' }}>#{item.id}</td>
                  <td style={{ padding: '14px 18px', fontWeight: '600', color: '#1e293b' }}>{item.name}</td>
                  <td style={{ padding: '14px 18px', color: '#475569' }}>
                    <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontSize: '13px' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: item.status === 'Active' ? '#dcfce7' : item.status === 'Pending' ? '#fef3c7' : '#f1f5f9',
                      color: item.status === 'Active' ? '#166534' : item.status === 'Pending' ? '#92400e' : '#475569'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      style={{
                        background: '#fee2e2',
                        color: '#991b1b',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}