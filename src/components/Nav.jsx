import React from 'react';
import { NavLink, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { contactListQuery } from '../routes/root'

export default function Nav() {
  const { q } = useLoaderData();
  const { data: contacts } = useQuery(contactListQuery(q));
  return (
    <nav>
      {contacts.length ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <NavLink
                to={`contacts/${contact.id}`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                {contact.first || contact.last ? (
                  <>
                    {contact.first} {contact.last}
                  </>
                ) : (
                  <i>No Name</i>
                )}{" "}
                {contact.favorite && <span>★</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </nav>
  )
}