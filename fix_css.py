import sys

with open('src/app/globals.css', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

target = """
.services-list-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
  overflow-x: hidden; /* Prevent horizontal scrollbar when sliding in */
}

.service-card-animated {
  background: #ffffff;
  border: 1px solid rgba(25, 20, 14, 0.05);
  border-radius: 20px;
  padding: 40px 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  width: 85%;
  box-shadow: 0 10px 40px rgba(46, 31, 13, 0.05);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
  
  /* Fallback visibility and properties */
  animation-fill-mode: both;
}

@supports (animation-timeline: view()) {
  .service-card-animated {
    animation-timeline: view();
    animation-range: entry 10% cover 40%;
  }
}

.service-card-animated:hover {
  box-shadow: 0 20px 50px rgba(46, 31, 13, 0.08);
  border-color: rgba(217, 138, 69, 0.3);
}

.service-card-animated:nth-child(odd) {
  align-self: flex-start;
  animation-name: slide-in-left;
}

.service-card-animated:nth-child(even) {
  align-self: flex-end;
  flex-direction: row-reverse;
  text-align: right;
  animation-name: slide-in-right;
}
"""

replacement = """
.services-list-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.service-card-animated {
  background: #ffffff;
  border: 1px solid rgba(25, 20, 14, 0.05);
  border-radius: 20px;
  padding: 40px 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(46, 31, 13, 0.05);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
  
  /* Fallback visibility and properties */
  animation-fill-mode: both;
}

@supports (animation-timeline: view()) {
  .service-card-animated {
    animation-timeline: view();
    animation-range: entry 10% cover 30%;
  }
}

.service-card-animated:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(46, 31, 13, 0.08);
  border-color: rgba(217, 138, 69, 0.3);
}

.service-card-animated:nth-child(odd) {
  animation-name: slide-in-left;
}

.service-card-animated:nth-child(even) {
  animation-name: slide-in-right;
}
"""

content = content.replace(target.strip(), replacement.strip())

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)
