// Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link depuis react-router-dom si vous utilisez React Router
import './Footer.css';
const Footer = () => {
  return (
  
        <div id="footer">
          <div className="container">
            <footer>
              <div className="row bgblue">
                <div className="col-sm-4">
                  <div className="menufooter">
                    <span>Catégorie</span>
                    <ul>
                      <li><a href="#">Informatique</a></li>
                      <li><a href="#">Image & Son</a></li>
                      <li><a href="#">Téléphonie</a></li>
                      <li><a href="#">Electroménager</a></li>
                      <li><a href="#">Beauté & Fitness</a></li>
                      <li><a href="#">Maison & Déco</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="menufooter">
                    <span>Catégorie</span>
                    <ul>
                      <li><a href="#">Informatique</a></li>
                      <li><a href="#">Image & Son</a></li>
                      <li><a href="#">Téléphonie</a></li>
                      <li><a href="#">Electroménager</a></li>
                      <li><a href="#">Beauté & Fitness</a></li>
                      <li><a href="#">Maison & Déco</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4">
                  <iframe
src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBCS.Manouba&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=true&appId"
 nonce="mKQT0FSj"
                   
                      width="340"
                    height="300"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="yes"
                    frameBorder="0"
                    allowFullScreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              </div>
            </footer>
          </div>
        </div>
      );
    };

export default Footer;
