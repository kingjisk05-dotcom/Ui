const tileStyle = document.createElement("style");
tileStyle.innerHTML = `
.cc-tile{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:6px;
  padding:14px;
  border-radius:14px;
  background:rgba(255,255,255,0.08);
  color:#fff;
  font-size:13px;
  text-align:center;
  transition:0.25s ease;
}
.cc-tile:hover{
  background:var(--neon);
  color:#000;
}
`;
document.head.appendChild(tileStyle);
