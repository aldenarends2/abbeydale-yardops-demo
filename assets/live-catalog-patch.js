(async function(){
  try {
    const url = 'https://xflsbxdhkbetwgafgjzd.supabase.co/rest/v1/supplier_catalog?select=supplier_name,category,item_name,price_excl_vat,price_incl_vat,price_note,source_page&order=item_name.asc';
    const key = 'sb_publishable__9JBfHMUydwI370eKDpwJA_kRihI4NB';
    const res = await fetch(url, { headers: { apikey: key, Authorization: 'Bearer ' + key }, cache: 'no-store' });
    if (!res.ok) throw new Error('supplier_catalog ' + res.status);
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return;
    catalogue = rows.map(r => ({
      supplier: r.supplier_name || 'Hire-It',
      item: r.item_name || '',
      category: r.category || 'Supplier Catalogue',
      excl_vat: r.price_excl_vat == null ? (r.price_note || 'Confirm') : String(r.price_excl_vat),
      incl_vat: r.price_incl_vat == null ? (r.price_note || 'Confirm') : String(r.price_incl_vat),
      page: r.source_page || ''
    }));
    const catBadge = document.getElementById('catBadge');
    const sourceLine = document.getElementById('sourceLine');
    if (catBadge) catBadge.textContent = catalogue.length + ' live items';
    if (sourceLine) sourceLine.textContent = 'Data source: Supabase + live supplier_catalog (' + catalogue.length + ' items)';
    if (typeof writeAI === 'function') writeAI('Live supplier_catalog connected. Ask for grinder, poker, drive unit, generator, pump, breaker or any loaded supplier item.', false);
    if (typeof render === 'function') render();
  } catch (err) {
    console.warn('Live catalogue patch failed:', err);
  }
})();
